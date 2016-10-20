'use strict';

var module = angular.module('sislegisapp',
    ['ngRoute',
        'ngResource',
        'ngLocale',
        'ui.bootstrap',
        'ngTagsInput',
        'angularFileUpload',
        'ui.utils',
        'angular-confirm',
        'toaster',
        'angular.filter',
        'checklist-model',
        'angularjs-dropdown-multiselect',
        'infinite-scroll',
        'ui.mask'
    ]);

module.constant('BACKEND', 'http://BACKEND_SERVER/sislegis/rest');

var auth = {
    me: null,
    loggedIn: false,
    isAdmin: function () {
        return this.hasRole('ADMIN') || (auth.authz != null && auth.authz.hasRealmRole("admin"));//part dois é para o admin via keycloak
    },
    isSecretario: function (ascendente) {
        return this.hasRole('SECRETARIO') || (ascendente && this.isAdmin(true));
    },
    isDiretor: function (ascendente) {
        return this.hasRole('DIRETOR') || (ascendente && this.isSecretario(true));
    },
    isEquipe: function (ascendente) {

        return this.hasRole('EQUIPE') || (ascendente && this.isDiretor(true));
    },
    isAspar: function (ascendente) {
        return this.hasRole('ASPAR') || (ascendente && this.isEquipe(true));

    },
    hasRole: function (role) {
        if (this.me != null && this.me.papeis != null) {
            for (var index = 0; index < this.me.papeis.length; index++) {
                var element = this.me.papeis[index];
                if (element == role) {
                    return true;
                }
            }
        }
        return false;
    },
    refreshToken: function () {
        if (auth.authz != null) {
            auth.authz.updateToken(60).success(function (refreshed) {
                if (refreshed) {
                    console.log('Token was successfully refreshed');
                } else {
                    console.log('Token is still valid');
                }
            }).error(function () {
                console.log('Failed to refresh the token, or the session has expired');
            });
        } else {
            console.log("no authz")
        }
    },
    repeatId:null,
    initTokenRefresh:function(){
        var self = this;
        this.repeatId = setInterval(self.refreshToken, 30000);

    },
    logout:function(){
        clearInterval(this.repeatId);
        this.loggedIn = false;
        this.authz = null;
        window.location = this.logoutUrl;
    }
};

var logout = function () {
    auth.logout();
    
    
};

angular.element(document).ready(function ($http) {
    var keycloakAuth = new Keycloak('keycloak.json');
    auth.loggedIn = false;

    keycloakAuth.init({ onLoad: 'login-required' }).success(function () {
        keycloakAuth.loadUserInfo();
        auth.loggedIn = true;
        auth.authz = keycloakAuth;

        auth.logoutUrl = keycloakAuth.authServerUrl + "/realms/" + keycloakAuth.realm + "/tokens/logout?redirect_uri=http://sislegis.mj.gov.br";
        module.factory('Auth', function () {
            return auth;
        });
        
        auth.initTokenRefresh();

        angular.bootstrap(document, ["sislegisapp"]);

    }).error(function (e) {
        console.error("failed to login", e);
    });
});

module.controller('GlobalCtrl', function ($scope, $http, UsuarioResource, Auth) {   
      
    Auth.me = UsuarioResource.me();
    $scope.auth=Auth;
    $scope.logout = logout;
});

module.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/relatorios', { templateUrl: 'views/relatorio/relatorios.html', controller: 'RelatorioController',
         resolve: {
                        tipo: function ($route) {

                            return null;

                        }
                    }
                 })
        .when('/relatorios/Despachadas', { templateUrl: 'views/relatorio/relatorios.html', controller: 'RelatorioController' ,  
            resolve: {
                        tipo: function ($route) {

                            return 'Padrao_Despachos';

                        }
                    }
        })
        .when('/notatecnica/:notaid', { templateUrl: 'views/relatorio/notatecnica.html', controller: 'NotaTecnicaController',
        
                 })   
                 
        .when('/Tags', { templateUrl: 'views/Tag/search.html', controller: 'SearchTagController' })
        .when('/Tags/new', { templateUrl: 'views/Tag/detail.html', controller: 'EditTagController' })
        .when('/Tags/edit/:id', { templateUrl: 'views/Tag/detail.html', controller: 'EditTagController' })
        
        .when('/Reuniaos/reuniaonova', { templateUrl: 'views/Reuniao/reuniaonova.html', controller: 'GerenciarReuniaoController' })
        .when('/Reuniaos/gerenciar', { templateUrl: 'views/Reuniao/gerenciar.html', controller: 'GerenciarReuniaoController' })
        .when('/Reuniaos/gerenciar/:ReuniaoId', { templateUrl: 'views/Reuniao/gerenciar.html', controller: 'GerenciarReuniaoController' })

        .when('/Proposicao/consultar', { templateUrl: 'views/Proposicao/consultar-proposicao.html', controller: 'ConsultaProposicoesController',
                resolve: {
                        configConsulta: function ($route) {

                            return {botoes:'GENERICO'};

                        }
                    }
        })
        .when('/Proposicao/despachar', { templateUrl: 'views/Proposicao/consultar-proposicao.html', controller: 'ConsultaProposicoesController',
                resolve: {
                        configConsulta: function ($route) {

                            return {filtro:{estado:'ADESPACHAR'},botoes:'DESPACHO'};

                        }
                    }
        })
        .when('/Proposicao/id/:ProposicaoId', { templateUrl: 'views/Proposicao/single-proposicao.html', controller: 'ProposicaoController' })

        .when('/Posicionamentos', { templateUrl: 'views/SimpleEntity/search.html', controller: 'SearchPosicionamentoController' })
        .when('/Posicionamentos/new', { templateUrl: 'views/SimpleEntity/detail.html', controller: 'NewPosicionamentoController' })
        .when('/Posicionamentos/edit/:PosicionamentoId', { templateUrl: 'views/SimpleEntity/detail.html', controller: 'EditPosicionamentoController' })

        .when('/StatusSidof', { templateUrl: 'views/StatusSidof/search.html', controller: 'SearchStatusSidofController' })
        .when('/StatusSidof/new', { templateUrl: 'views/StatusSidof/detail.html', controller: 'NewStatusSidofController' })
        .when('/StatusSidof/edit/:StatusSidofId', { templateUrl: 'views/StatusSidof/detail.html', controller: 'EditStatusSidofController' })

        .when('/OrigemElaboracaoNormativas', { templateUrl: 'views/OrigemElaboracaoNormativa/search.html', controller: 'SearchOrigemElaboracaoNormativaController' })
        .when('/OrigemElaboracaoNormativas/new', { templateUrl: 'views/OrigemElaboracaoNormativa/detail.html', controller: 'NewOrigemElaboracaoNormativaController' })
        .when('/OrigemElaboracaoNormativas/edit/:OrigemElaboracaoNormativaId', { templateUrl: 'views/OrigemElaboracaoNormativa/detail.html', controller: 'EditOrigemElaboracaoNormativaController' })

        .when('/AreaConsultadas', { templateUrl: 'views/AreaConsultada/search.html', controller: 'SearchAreaConsultadaController' })
        .when('/AreaConsultadas/new', { templateUrl: 'views/AreaConsultada/detail.html', controller: 'NewAreaConsultadaController' })
        .when('/AreaConsultadas/edit/:AreaConsultadaId', { templateUrl: 'views/AreaConsultada/detail.html', controller: 'EditAreaConsultadaController' })
        
        .when('/AreaDeMerito', { templateUrl: 'views/AreaDeMerito/search.html', controller: 'SearchAreaMeritoController' })
        .when('/AreaDeMerito/new', { templateUrl: 'views/AreaDeMerito/detail.html', controller: 'EditAreaMeritoController' })
        .when('/AreaDeMerito/edit/:id', { templateUrl: 'views/AreaDeMerito/detail.html', controller: 'EditAreaMeritoController' })

        .when('/Orgaos', { templateUrl: 'views/SimpleEntity/search.html', controller: 'SearchOrgaoController' })
        .when('/Orgaos/new', { templateUrl: 'views/SimpleEntity/detail.html', controller: 'NewOrgaoController' })
        .when('/Orgaos/edit/:OrgaoId', { templateUrl: 'views/SimpleEntity/detail.html', controller: 'EditOrgaoController' })

        .when('/TipoEncaminhamentos', { templateUrl: 'views/SimpleEntity/search.html', controller: 'SearchTipoEncaminhamentoController' })
        .when('/TipoEncaminhamentos/new', { templateUrl: 'views/SimpleEntity/detail.html', controller: 'NewTipoEncaminhamentoController' })
        .when('/TipoEncaminhamentos/edit/:TipoEncaminhamentoId', { templateUrl: 'views/SimpleEntity/detail.html', controller: 'EditTipoEncaminhamentoController' })

        .when('/Usuarios', { templateUrl: 'views/Usuario/search.html', controller: 'SearchUsuarioController' })
        .when('/Usuarios/new', { templateUrl: 'views/Usuario/detail.html', controller: 'NewUsuarioController' })
        .when('/Usuarios/edit/:UsuarioId', { templateUrl: 'views/Usuario/detail.html', controller: 'EditUsuarioController' })

        .when('/Equipes', { templateUrl: 'views/Equipe/search.html', controller: 'SearchEquipeController' })
        .when('/Equipes/new', { templateUrl: 'views/Equipe/detail.html', controller: 'EquipeController' })
        .when('/Equipes/edit/:EquipeId', { templateUrl: 'views/Equipe/detail.html', controller: 'EquipeController' })

        .when('/ElaboracaoNormativa', { templateUrl: 'views/ElaboracaoNormativa/search.html', controller: 'SearchElaboracaoNormativaController' })
        .when('/ElaboracaoNormativa/new', { templateUrl: 'views/ElaboracaoNormativa/detail.html', controller: 'ElaboracaoNormativaController' })
        .when('/ElaboracaoNormativa/edit/:ElaboracaoNormativaId', { templateUrl: 'views/ElaboracaoNormativa/detail.html', controller: 'ElaboracaoNormativaController' })

        .when('/Upload', { templateUrl: 'views/Upload/upload.html', controller: 'UploadController' })
        .when('/Tarefas', { templateUrl: 'views/Tarefa/detail.html', controller: 'TarefaController' })
        .when('/Dashboard', { templateUrl: 'views/dashboard.html', controller: 'DashboardController' })
        .when('/Tarefas/edit/:TarefaId', { templateUrl: 'views/Tarefa/detail.html', controller: 'TarefaController' })

        .when('/GerenciarComissaoSeguida', { templateUrl: 'views/AgendaComissao/search.html', controller: 'SearchAgendaComissaoController' })

        .when('/GerenciarSituacoes', { templateUrl: 'views/SituacaoLegislativa/search.html', controller: 'SituacaoLegislativaController' })

        .otherwise({
            redirectTo: '/Dashboard'
        });
}]);

module.controller('NavController', function NavController($scope, $location) {
    $scope.matchesRoute = function (route) {
        var path = $location.path();
        return (path === ("/" + route) || path.indexOf("/" + route + "/") == 0);
    };
});

module.factory('authInterceptor', function ($q, Auth) {
    return {
        request: function (config) {
            var deferred = $q.defer();
            if (Auth.authz.token) {
                Auth.authz.updateToken(5).success(function () {
                    config.headers = config.headers || {};
                    config.headers.Authorization = 'Bearer ' + Auth.authz.token;

                    deferred.resolve(config);
                }).error(function () {
                    deferred.reject('Failed to refresh token');
                });
            }
            return deferred.promise;
        }
    };
});

module.factory('errorInterceptor', function ($q) {
    return function (promise) {
        return promise.then(function (response) {
            return response;
        }, function (response) {
            if (response.status == 401) {
                console.log('session timeout?');
                logout();
            } else if (response.status == 403) {
                console.error("Forbidden");
            } else if (response.status == 404) {
                console.error("Not found");
            } else if (response.status) {
                if (response.data && response.data.errorMessage) {
                    console.error(response.data.errorMessage);
                } else {
                    console.error("An unexpected server error has occurred");
                }
            }
            return $q.reject(response);
        });
    };
});

module.config(function ($httpProvider) {
    $httpProvider.responseInterceptors.push('errorInterceptor');
    $httpProvider.interceptors.push('authInterceptor');
});

