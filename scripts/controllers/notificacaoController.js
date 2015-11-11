angular.module('sislegisapp').controller('NotificacaoController', function($scope, $routeParams, $location,
    $rootScope, $timeout, $modal, toaster, locationParser, NotificacaoResource, TarefaResource, ProposicaoResource, ComentarioResource, EncaminhamentoProposicaoResource) {

	
	
    $scope.getListaNotificacaoTarefas = function() {
        var successCallback = function(data) {
        	console.log("Lista tarefas",data)
        	$scope.listaNotificacaoTarefas = data;
        };
        var errorCallback = function() {
        	toaster.pop('error', 'Erro ao lista tarefas do usuario');
        };
        
        NotificacaoResource.buscarPorUsuario({categoria:"TAREFAS"
        }, successCallback, errorCallback);

    }
    
    $rootScope.$on('updateTarefas', function(event) {
        $scope.getListaNotificacaoTarefas();
    });

    $scope.getListaNotificacaoTarefas();
});

