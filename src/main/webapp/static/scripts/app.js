'use strict';

angular.module('sislegisapp',['ngRoute','ngResource','ngLocale','ui.bootstrap','ngTagsInput', 'angularFileUpload', 'ui.utils', 
                              'toaster', 'angular.filter', 'checklist-model', 'angularjs-dropdown-multiselect'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
    	.when('/Reuniaos/reuniaonova',{templateUrl:'views/Reuniao/reuniaonova.html',controller:'GerenciarReuniaoController'})	
    	.when('/Reuniaos/gerenciar',{templateUrl:'views/Reuniao/gerenciar.html',controller:'GerenciarReuniaoController'})
		.when('/Reuniaos/gerenciar/:ReuniaoId',{templateUrl:'views/Reuniao/gerenciar.html',controller:'GerenciarReuniaoController'})
		
		.when('/Posicionamentos',{templateUrl:'views/Posicionamento/search.html',controller:'SearchPosicionamentoController'})
		.when('/Posicionamentos/new',{templateUrl:'views/Posicionamento/detail.html',controller:'NewPosicionamentoController'})
		.when('/Posicionamentos/edit/:PosicionamentoId',{templateUrl:'views/Posicionamento/detail.html',controller:'EditPosicionamentoController'})

		.when('/StatusSidof',{templateUrl:'views/StatusSidof/search.html',controller:'SearchStatusSidofController'})
		.when('/StatusSidof/new',{templateUrl:'views/StatusSidof/detail.html',controller:'NewStatusSidofController'})
		.when('/StatusSidof/edit/:StatusSidofId',{templateUrl:'views/StatusSidof/detail.html',controller:'EditStatusSidofController'})
		
		.when('/OrigemElaboracaoNormativas',{templateUrl:'views/OrigemElaboracaoNormativa/search.html',controller:'SearchOrigemElaboracaoNormativaController'})
		.when('/OrigemElaboracaoNormativas/new',{templateUrl:'views/OrigemElaboracaoNormativa/detail.html',controller:'NewOrigemElaboracaoNormativaController'})
		.when('/OrigemElaboracaoNormativas/edit/:OrigemElaboracaoNormativaId',{templateUrl:'views/OrigemElaboracaoNormativa/detail.html',controller:'EditOrigemElaboracaoNormativaController'})
		
		.when('/AreaConsultadas',{templateUrl:'views/AreaConsultada/search.html',controller:'SearchAreaConsultadaController'})
		.when('/AreaConsultadas/new',{templateUrl:'views/AreaConsultada/detail.html',controller:'NewAreaConsultadaController'})
		.when('/AreaConsultadas/edit/:AreaConsultadaId',{templateUrl:'views/AreaConsultada/detail.html',controller:'EditAreaConsultadaController'})

		.when('/Orgaos',{templateUrl:'views/Orgao/search.html',controller:'SearchOrgaoController'})
		.when('/Orgaos/new',{templateUrl:'views/Orgao/detail.html',controller:'NewOrgaoController'})
		.when('/Orgaos/edit/:OrgaoId',{templateUrl:'views/Orgao/detail.html',controller:'EditOrgaoController'})
		
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
	    .when('/ElaboracaoNormativa/new',{templateUrl:'views/ElaboracaoNormativa/detail.html',controller:'ElaboracaoNormativaController'})
	    .when('/ElaboracaoNormativa/edit/:ElaboracaoNormativaId',{templateUrl:'views/ElaboracaoNormativa/detail.html',controller:'ElaboracaoNormativaController'})
	    
	    .when('/Upload',{templateUrl:'views/Upload/upload.html',controller:'UploadController'})
	    .when('/Tarefas',{templateUrl:'views/Tarefa/detail.html', controller:'TarefaController'})
	    .when('/Tarefas/edit/:TarefaId',{templateUrl:'views/Tarefa/detail.html', controller:'TarefaController'})
	    .otherwise({
	    	redirectTo: '/Reuniaos/reuniaonova'
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
