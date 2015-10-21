angular.module('sislegisapp').controller('TarefaController', function($scope, $routeParams, $location,
    $rootScope, $timeout, $modal, toaster, locationParser, TarefaResource, ProposicaoResource, ComentarioResource, EncaminhamentoProposicaoResource) {

	$scope.tarefa = new TarefaResource();
	
    $scope.getListaTarefas = function() {
        var successCallback = function(data) {
        	$scope.listaTarefas = data;
        };
        var errorCallback = function() {
        	toaster.pop('error', 'Erro ao lista tarefas do usuario');
        };
        
        TarefaResource.buscarPorUsuario({
        }, successCallback, errorCallback);

    }
    
    $scope.finalizarTarefa = function(tarefa) {
        var successCallback = function() {
            toaster.pop('success', 'Tarefa finalizada com sucesso');
        };
        var errorCallback = function() {
        	toaster.pop('error', 'Falha ao finalizar tarefa');
        };

        $scope.tarefa = tarefa;
        $scope.tarefa.finalizada = true
        $scope.tarefa.$update(successCallback, errorCallback);
    };
    
    $scope.abrirModalComentarios = function(idProposicao) {
        var modalInstance = $modal.open({
          templateUrl: 'views/Tarefa/modal-comentarios.html',
          controller: 'ModalComentariosCtrl',
          size: 'lg',
          resolve: {
        	  comentarios: function () {
            	return  ComentarioResource.findByProposicao({
                    ProposicaoId: idProposicao
                });
            }
          }
        });
    };
    
    $scope.abrirModalEncaminhamentos = function(idProposicao) {
        var modalInstance = $modal.open({
          templateUrl: 'views/Tarefa/modal-encaminhamentos.html',
          controller: 'ModalEncaminhamentosCtrl',
          size: 'lg',
          resolve: {
        	  encaminhamentos: function () {
            	return  EncaminhamentoProposicaoResource.findByProposicao({
                    ProposicaoId: idProposicao
                });
            }
          }
        });
    };

    // Caso o usuário clique numa tarefa específica, colocamos seu id no escopo para realizar o filtro
    if ($location.path().indexOf("edit") > -1) {
        if ($routeParams.TarefaId != undefined) {
        	$scope.editTarefaId = $routeParams.TarefaId;
        }
    }

    $rootScope.$on('updateTarefas', function(event) {
        $scope.getListaTarefas();
    });

    $scope.getListaTarefas();
});


angular.module('sislegisapp').controller('ModalComentariosCtrl', function ($scope, $modalInstance, comentarios) {
	  $scope.comentarios = comentarios;
	
	  $scope.ok = function () {
	    $modalInstance.close();
	  };

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
});

angular.module('sislegisapp').controller('ModalEncaminhamentosCtrl', function ($scope, $modalInstance, encaminhamentos) {
	  $scope.encaminhamentos = encaminhamentos;
	
	  $scope.ok = function () {
	    $modalInstance.close();
	  };

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
});
