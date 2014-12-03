
angular.module('sislegisapp').controller('TarefaController', function ($scope, $routeParams,  $location, locationParser, TarefaResource) {

	$scope.getListaTarefas = function() {
		var successCallback = function(success) {

		};
		var errorCallback = function() {
			console.error('Erro ao lista tarefas do usuario');
		};
		
		$scope.listaTarefas = TarefaResource.buscarPorUsuario({
			idUsuario : 999// ToDo: Mudar para o usuario corrente
		}, successCallback, errorCallback); 
		
	}

	$scope.detalhamentoTarefa = false;
	
	$scope.getTarefa = function(id) {
		
		var successCallback = function(data) {
			$scope.detalhamentoTarefa = true;
		};
		
		var errorCallback = function(data) {
			
		};
		
		$scope.tarefa = TarefaResource.get({TarefaId:id}, successCallback, errorCallback);
	}
	
	$scope.getListaTarefas();
});
