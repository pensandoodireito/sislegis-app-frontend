angular.module('sislegisapp').controller('TarefaController', function($scope, $routeParams, $location,
    $rootScope, $timeout, toaster, locationParser, TarefaResource, ProposicaoResource, ComentarioResource, EncaminhamentoProposicaoResource) {

	$scope.tarefa = new TarefaResource();
	
    $scope.getListaTarefas = function() {
        var successCallback = function(data) {
        	$scope.listaTarefas = data;
        };
        var errorCallback = function() {
            console.error('Erro ao lista tarefas do usuario');
        };
        
        TarefaResource.buscarPorUsuario({
            idUsuario: 999 // ToDo: Mudar para o usuario corrente
        }, successCallback, errorCallback);

    }

    $scope.setProposicao = function(idProposicao) {
    	 var successCallback = function(data) {
            $scope.proposicao = data;
         };
         var errorCallback = function() {};
    	
        ProposicaoResource.get({
            ProposicaoId: idProposicao
        }, successCallback, errorCallback);
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

    $scope.finalizarTarefa = function(tarefa) {
        var successCallback = function() {
            toaster.pop('success', 'Tarefa finalizada com sucesso');
        };
        var errorCallback = function() {
        	toaster.pop('error', 'Falha ao finalizar tarefa');
        };

        console.log(tarefa);
        $scope.tarefa = tarefa;
        $scope.tarefa.finalizada = true
        $scope.tarefa.$update(successCallback, errorCallback);
    };

    if ($location.path().indexOf("edit") > -1) {
        if ($routeParams.TarefaId != undefined) {
        	$scope.editTarefaId = $routeParams.TarefaId;
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
