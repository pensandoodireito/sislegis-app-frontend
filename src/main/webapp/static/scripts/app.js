'use strict';

angular.module('sislegisapp',['ngRoute','ngResource','ngLocale','ui.bootstrap','ngTagsInput','angucomplete'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
	.when('/Reuniaos/gerenciar',{templateUrl:'views/Reuniao/gerenciar.html',controller:'GerenciarReuniaoController'})
	.when('/Reuniaos/gerenciar/:ReuniaoId',{templateUrl:'views/Reuniao/gerenciar.html',controller:'GerenciarReuniaoController'})
	.when('/Posicionamentos',{templateUrl:'views/Posicionamento/search.html',controller:'SearchPosicionamentoController'})
	.when('/Posicionamentos/new',{templateUrl:'views/Posicionamento/detail.html',controller:'NewPosicionamentoController'})
	.when('/Posicionamentos/edit/:PosicionamentoId',{templateUrl:'views/Posicionamento/detail.html',controller:'EditPosicionamentoController'})
	.when('/Encaminhamentos',{templateUrl:'views/Encaminhamento/search.html',controller:'SearchEncaminhamentoController'})
	.when('/Encaminhamentos/new',{templateUrl:'views/Encaminhamento/detail.html',controller:'NewEncaminhamentoController'})
	.when('/Encaminhamentos/edit/:EncaminhamentoId',{templateUrl:'views/Encaminhamento/detail.html',controller:'EditEncaminhamentoController'})
	.when('/Usuarios',{templateUrl:'views/Usuario/search.html',controller:'SearchUsuarioController'})
	.when('/Usuarios/new',{templateUrl:'views/Usuario/detail.html',controller:'NewUsuarioController'})
	.when('/Usuarios/edit/:UsuarioId',{templateUrl:'views/Usuario/detail.html',controller:'EditUsuarioController'})
	.when('/Equipes',{templateUrl:'views/Equipe/search.html',controller:'SearchEquipeController'})
    .when('/Equipes/new',{templateUrl:'views/Equipe/detail.html',controller:'EquipeController'})
    .when('/Equipes/edit/:EquipeId',{templateUrl:'views/Equipe/detail.html',controller:'EquipeController'})
    .when('/ElaboracaoNormativa',{templateUrl:'views/ElaboracaoNormativa/search.html',controller:'SearchElaboracaoNormativaController'})
    .when('/ElaboracaoNormativa/new',{templateUrl:'views/ElaboracaoNormativa/elaboracaoNormativa.html',controller:'ElaboracaoNormativaController'})
    
	
	  .otherwise({
	    redirectTo: '/Reuniaos/gerenciar'
	  });
  }])
  
  .config(['$httpProvider', function($httpProvider) {
	  $httpProvider.interceptors.push('HttpInterceptor');
  }])
  
  .controller('NavController', function NavController($scope, $location) {
    $scope.matchesRoute = function(route) {
        var path = $location.path();
        return (path === ("/" + route) || path.indexOf("/" + route + "/") == 0);
	    };
});
