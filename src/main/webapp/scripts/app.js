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
	
    //TODO remover 
	  .when('/buscarProposicao',{templateUrl:'views/Comissao/buscarProposicao.html',controller:'SearchComissaoController'})
	  .when('/Comissaos/new',{templateUrl:'views/Comissao/detail.html',controller:'NewComissaoController'})
	  .when('/Comissaos/edit/:ComissaoId',{templateUrl:'views/Comissao/detail.html',controller:'EditComissaoController'})
	  .when('/Proposicaos',{templateUrl:'views/Proposicao/search.html',controller:'SearchProposicaoController'})
	  .when('/Proposicaos/new',{templateUrl:'views/Proposicao/detail.html',controller:'NewProposicaoController'})
	  .when('/Proposicaos/edit/:ProposicaoId',{templateUrl:'views/Proposicao/detail.html',controller:'EditProposicaoController'})
	  .when('/Reuniaos',{templateUrl:'views/Reuniao/search.html',controller:'SearchReuniaoController'})
	  .when('/Reuniaos/new',{templateUrl:'views/Reuniao/detail.html',controller:'NewReuniaoController'})
	  .when('/Reuniaos/edit/:ReuniaoId',{templateUrl:'views/Reuniao/detail.html',controller:'EditReuniaoController'})
	  
	
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
