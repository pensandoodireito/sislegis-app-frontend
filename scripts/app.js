'use strict';

var module = angular.module('sislegisapp',
    [   'ngRoute',
        'ngResource',
        'ngLocale',
        'ui.bootstrap',
        'ngTagsInput',
        'angularFileUpload',
        'ui.utils',
        'toaster',
        'angular.filter',
        'checklist-model',
        'angularjs-dropdown-multiselect',
        'infinite-scroll',
        'ui.mask'
    ]);

module.constant('BACKEND', 'http://localhost/sislegis/rest');

var auth = {};

var logout = function(){
    console.log('*** LOGOUT');
    auth.loggedIn = false;
    auth.authz = null;
    window.location = auth.logoutUrl;
};

angular.element(document).ready(function ($http) {
    var keycloakAuth = new Keycloak('keycloak.json');
    auth.loggedIn = false;

    keycloakAuth.init({ onLoad: 'login-required' }).success(function () {
        console.log('*** LOGIN',keycloakAuth);
        keycloakAuth.loadUserInfo();
        auth.loggedIn = true;
        auth.authz = keycloakAuth;
        auth.logoutUrl = keycloakAuth.authServerUrl + "/realms/" + keycloakAuth.realm + "/tokens/logout?redirect_uri=http://sislegis.local";
        module.factory('Auth', function() {
            return auth;
        });

        angular.bootstrap(document, ["sislegisapp"]);

    }).error(function () {
            console.error("failed to login");
    });
});

module.controller('GlobalCtrl', function($scope, $http) {
    $scope.logout = logout;
});

module.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    	.when('/Reuniaos/reuniaonova',{templateUrl:'views/Reuniao/reuniaonova.html',controller:'GerenciarReuniaoController'})	
    	.when('/Reuniaos/gerenciar',{templateUrl:'views/Reuniao/gerenciar.html',controller:'GerenciarReuniaoController'})
		.when('/Reuniaos/gerenciar/:ReuniaoId',{templateUrl:'views/Reuniao/gerenciar.html',controller:'GerenciarReuniaoController'})
		
		.when('/Proposicao/consultar',{templateUrl:'views/Proposicao/consultar-proposicao.html',controller:'GerenciarReuniaoController'})
		
		.when('/Posicionamentos',{templateUrl:'views/SimpleEntity/search.html',controller:'SearchPosicionamentoController'})
		.when('/Posicionamentos/new',{templateUrl:'views/SimpleEntity/detail.html',controller:'NewPosicionamentoController'})
		.when('/Posicionamentos/edit/:PosicionamentoId',{templateUrl:'views/SimpleEntity/detail.html',controller:'EditPosicionamentoController'})

		.when('/StatusSidof',{templateUrl:'views/StatusSidof/search.html',controller:'SearchStatusSidofController'})
		.when('/StatusSidof/new',{templateUrl:'views/StatusSidof/detail.html',controller:'NewStatusSidofController'})
		.when('/StatusSidof/edit/:StatusSidofId',{templateUrl:'views/StatusSidof/detail.html',controller:'EditStatusSidofController'})
		
		.when('/OrigemElaboracaoNormativas',{templateUrl:'views/OrigemElaboracaoNormativa/search.html',controller:'SearchOrigemElaboracaoNormativaController'})
		.when('/OrigemElaboracaoNormativas/new',{templateUrl:'views/OrigemElaboracaoNormativa/detail.html',controller:'NewOrigemElaboracaoNormativaController'})
		.when('/OrigemElaboracaoNormativas/edit/:OrigemElaboracaoNormativaId',{templateUrl:'views/OrigemElaboracaoNormativa/detail.html',controller:'EditOrigemElaboracaoNormativaController'})
		
		.when('/AreaConsultadas',{templateUrl:'views/AreaConsultada/search.html',controller:'SearchAreaConsultadaController'})
		.when('/AreaConsultadas/new',{templateUrl:'views/AreaConsultada/detail.html',controller:'NewAreaConsultadaController'})
		.when('/AreaConsultadas/edit/:AreaConsultadaId',{templateUrl:'views/AreaConsultada/detail.html',controller:'EditAreaConsultadaController'})

		.when('/Orgaos',{templateUrl:'views/SimpleEntity/search.html',controller:'SearchOrgaoController'})
		.when('/Orgaos/new',{templateUrl:'views/SimpleEntity/detail.html',controller:'NewOrgaoController'})
		.when('/Orgaos/edit/:OrgaoId',{templateUrl:'views/SimpleEntity/detail.html',controller:'EditOrgaoController'})
		
		.when('/Encaminhamentos',{templateUrl:'views/SimpleEntity/search.html',controller:'SearchEncaminhamentoController'})
		.when('/Encaminhamentos/new',{templateUrl:'views/SimpleEntity/detail.html',controller:'NewEncaminhamentoController'})
		.when('/Encaminhamentos/edit/:EncaminhamentoId',{templateUrl:'views/SimpleEntity/detail.html',controller:'EditEncaminhamentoController'})
		
		.when('/Usuarios',{templateUrl:'views/Usuario/search.html',controller:'SearchUsuarioController'})
		.when('/Usuarios/new',{templateUrl:'views/Usuario/detail.html',controller:'NewUsuarioController'})
		.when('/Usuarios/edit/:UsuarioId',{templateUrl:'views/Usuario/detail.html',controller:'EditUsuarioController'})
		
		.when('/Equipes',{templateUrl:'views/Equipe/search.html',controller:'SearchEquipeController'})
	    .when('/Equipes/new',{templateUrl:'views/Equipe/detail.html',controller:'EquipeController'})
	    .when('/Equipes/edit/:EquipeId',{templateUrl:'views/Equipe/detail.html',controller:'EquipeController'})
	    
	    .when('/ElaboracaoNormativa',{templateUrl:'views/ElaboracaoNormativa/search.html',controller:'SearchElaboracaoNormativaController'})
	    .when('/ElaboracaoNormativa/new',{templateUrl:'views/ElaboracaoNormativa/detail.html',controller:'ElaboracaoNormativaController'})
	    .when('/ElaboracaoNormativa/edit/:ElaboracaoNormativaId',{templateUrl:'views/ElaboracaoNormativa/detail.html',controller:'ElaboracaoNormativaController'})
	    
	    .when('/Upload',{templateUrl:'views/Upload/upload.html',controller:'UploadController'})
	    .when('/Tarefas',{templateUrl:'views/Tarefa/detail.html', controller:'TarefaController'})
	    .when('/Tarefas/edit/:TarefaId',{templateUrl:'views/Tarefa/detail.html', controller:'TarefaController'})
	    
	    .when('/GerenciarComissaoSeguida',{templateUrl:'views/AgendaComissao/search.html',controller:'SearchAgendaComissaoController'})
	    
	    .otherwise({
	    	redirectTo: '/Reuniaos/reuniaonova'
	    });
}]);
  
module.controller('NavController', function NavController($scope, $location) {
	  $scope.matchesRoute = function(route) {
	      var path = $location.path();
	      return (path === ("/" + route) || path.indexOf("/" + route + "/") == 0);
	  };
});

module.factory('authInterceptor', function($q, Auth) {
    return {
        request: function (config) {
            var deferred = $q.defer();
            if (Auth.authz.token) {
                Auth.authz.updateToken(5).success(function() {
                    config.headers = config.headers || {};
                    config.headers.Authorization = 'Bearer ' + Auth.authz.token;

                    deferred.resolve(config);
                }).error(function() {
                        deferred.reject('Failed to refresh token');
                    });
            }
            return deferred.promise;
        }
    };
});

module.factory('errorInterceptor', function($q) {
    return function(promise) {
        return promise.then(function(response) {
            return response;
        }, function(response) {
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

module.config(function($httpProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
    $httpProvider.responseInterceptors.push('errorInterceptor');
    $httpProvider.interceptors.push('authInterceptor');
});

