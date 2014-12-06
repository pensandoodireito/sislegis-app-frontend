
angular.module('sislegisapp').controller('TarefaController', function ($scope, $routeParams, $location, $rootScope, $timeout, locationParser, TarefaResource, ProposicaoResource) {
	
	$scope.tarefa = new TarefaResource();

	$scope.getListaTarefas = function() {
		var successCallback = function(success) {

		};
		var errorCallback = function() {
			console.error('Erro ao lista tarefas do usuario');
		};
		
		$scope.detalhamentoTarefa = false;
		
		$scope.listaTarefas = TarefaResource.buscarPorUsuario({
			idUsuario : 999// ToDo: Mudar para o usuario corrente
		}, successCallback, errorCallback); 
		
	}
	
	/**
	 * Chamado quando o usuario clica em uma tarefa especifica a partir do notification bar
	 */
	$scope.getTarefa = function(id) {
		var successCallback = function(data) {
			$scope.detalhamentoTarefa = true;
			$scope.setProposicao($scope.tarefa.encaminhamentoProposicao.proposicao.id);
		};
		
		var errorCallback = function(data) {
			
		};

		$scope.tarefa = TarefaResource.get({TarefaId:id}, successCallback, errorCallback);
	}
	
	$scope.setProposicao = function(idProposicao) {
		$scope.tarefa.encaminhamentoProposicao.proposicao = ProposicaoResource.get({ProposicaoId:idProposicao});
		console.log($scope.tarefa.encaminhamentoProposicao.proposicao);
	}
	
	$scope.finalizarTarefa = function() {
        var successCallback = function(){
            addAlert({type: 'success', msg: 'Registro atualizado com sucesso.'});
        	$rootScope.inativeSpinner = false;
        	
        	// Atualiza tanbém a lista da esquerda, para constar como finalizada
        	for (var i = 0; i < $scope.listaTarefas.length; i++) {
				if ($scope.listaTarefas[i].id == $scope.tarefa.id) {
					$scope.listaTarefas[i] = $scope.tarefa;
				}
   		 	}
        };
        var errorCallback = function() {
        
        };
        
        // Marca a tarefa como finalizada
        $scope.tarefa.finalizada = true;
        
        $scope.tarefa.$update(successCallback, errorCallback);
    };
    
    /**
     * Alerts
     */
    $scope.alerts = [];

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
    
    var addAlert = function(alert){
    	$scope.alerts.push(alert);
    	$timeout(function() {
    		$scope.alerts.splice($scope.alerts.indexOf(alert), 1);
    	}, 3000);
    }
    
    if ($location.path().indexOf("edit") > -1) {
    	if ($routeParams.TarefaId != undefined) {
    		$scope.getTarefa($routeParams.TarefaId);
    	}
	}
	
	$scope.getListaTarefas();
});
