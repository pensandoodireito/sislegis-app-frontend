angular.module('sislegisapp').controller('TarefaController', function ($scope, $routeParams, $location,
    $rootScope, $timeout, $modal, toaster, locationParser, TarefaResource, ProposicaoResource, ComentarioResource, EncaminhamentoProposicaoResource, $http) {

    $scope.tarefa = new TarefaResource();

    $scope.getListaTarefas = function () {
        var successCallback = function (data) {
            $scope.listaTarefas = data;
        };
        var errorCallback = function () {
            toaster.pop('error', 'Erro ao lista tarefas do usuario');
        };

        TarefaResource.buscarPorUsuario({
        }, successCallback, errorCallback);

    }
    $scope.go = function (url, p) {
        $location.path(url).search({ filter: p });;
    }

    $scope.abrirModalComentarios = function (idProposicao, tarefa) {
        $scope.tarefa = tarefa;
        var modalInstance = $modal.open({
            templateUrl: 'views/Tarefa/modal-comentarios.html',
            controller: 'ModalComentariosCtrl',
            size: 'lg',
            resolve: {
                comentarios: function () {
                    return ComentarioResource.findByProposicao({
                        ProposicaoId: idProposicao
                    });
                },
                tarefa: function () {
                    return $scope.tarefa;
                }
            }
        });
    };

    $scope.abrirModalEncaminhamentos = function (idProposicao) {
        var modalInstance = $modal.open({
            templateUrl: 'views/Tarefa/modal-encaminhamentos.html',
            controller: 'ModalEncaminhamentosCtrl',
            size: 'lg',
            resolve: {
                encaminhamentos: function () {
                    return EncaminhamentoProposicaoResource.findByProposicao({
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

    $rootScope.$on('updateTarefas', function (event) {
        $scope.getListaTarefas();
    });

    $scope.getListaTarefas();
});


angular.module('sislegisapp').controller('ModalComentariosCtrl', function ($scope, $modalInstance, $rootScope, $confirm, toaster, comentarios, tarefa) {
    $scope.comentarios = comentarios;
    $scope.tarefa = tarefa;

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.finalizar = function () {
        var successCallback = function () {
            toaster.pop('success', 'Tarefa finalizada com sucesso.');
            $rootScope.$emit('updateTarefas');
            $modalInstance.close();
        };
        var errorCallback = function () {
            toaster.pop('error', 'Falha ao finalizar tarefa.');
        };

        var finalizarTarefa = function () {
            $scope.tarefa.$finalizar(successCallback, errorCallback);
        };

        if (!$scope.tarefa.comentarioFinalizacao) {
            $confirm({ text: 'Deseja fechar tarefa sem comentário?', title: 'Finalização de tarefa', ok: 'Sim', cancel: 'Não' })
                .then(finalizarTarefa);
        } else {
            finalizarTarefa();
        }

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
