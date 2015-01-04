angular.module('sislegisapp').controller('TarefaController', function($scope, $routeParams, $location,
    $rootScope, $timeout, toaster, locationParser, TarefaResource, ProposicaoResource, ComentarioResource, EncaminhamentoProposicaoResource) {


    $scope.tarefa = new TarefaResource();

    $scope.getListaTarefas = function() {
        var successCallback = function(success) {

        };
        var errorCallback = function() {
            console.error('Erro ao lista tarefas do usuario');
        };

        $scope.detalhamentoTarefa = false;

        $scope.listaTarefas = TarefaResource.buscarPorUsuario({
            idUsuario: 999 // ToDo: Mudar para o usuario corrente
        }, successCallback, errorCallback);

    }

    /**
     * Chamado quando o usuario clica em uma tarefa especifica a partir do notification bar
     */
    $scope.getTarefa = function(id) {
        var successCallback = function(data) {
            $scope.detalhamentoTarefa = true;
            var idProposicao = $scope.tarefa.encaminhamentoProposicao.proposicao.id;
            $scope.setProposicao(idProposicao);
            $scope.setComentarios(idProposicao);
            $scope.setEncaminhamentoProposicao(idProposicao);
        };

        var errorCallback = function(data) {

        };

        $scope.tarefa = TarefaResource.get({
            TarefaId: id
        }, successCallback, errorCallback);
    }


    $scope.setProposicao = function(idProposicao) {
        $scope.tarefa.encaminhamentoProposicao.proposicao = ProposicaoResource.get({
            ProposicaoId: idProposicao
        });
    }

    $scope.setComentarios = function(idProposicao) {
        var successCallback = function(data) {
            $scope.listaComentario = data;
        };
        var errorCallback = function() {};
        ComentarioResource.findByProposicao({
            ProposicaoId: idProposicao
        }, successCallback, errorCallback);
    }

    $scope.setEncaminhamentoProposicao = function(idProposicao) {
        var successCallback = function(data) {
            $scope.listaEncaminhamentoProposicao = data;
        };
        var errorCallback = function() {};
        EncaminhamentoProposicaoResource.findByProposicao({
            ProposicaoId: idProposicao
        }, successCallback, errorCallback);
    }

    $scope.finalizarTarefa = function() {
        var successCallback = function() {
            toaster.pop('success', 'Tarefa finalizada com sucesso');

            // Atualiza também a lista da esquerda, para constar como finalizada
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

    if ($location.path().indexOf("edit") > -1) {
        if ($routeParams.TarefaId != undefined) {
            $scope.getTarefa($routeParams.TarefaId);
        }
    }

    $rootScope.$on('updateTarefas', function(event) {
        $scope.getListaTarefas();
    });

    $scope.getListaTarefas();

    // CALENDARIO, pra filtrar por data.
    $scope.campoData = new Date();


    $scope.setCalendar = function() {
        $scope.openCalendar = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.format = 'dd/MM/yyyy';
    }

    $scope.setCalendar();
});
