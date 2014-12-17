angular.module('sislegisapp').controller('ModalRelatorioReuniaoController',
	function($scope, $http, $filter, $routeParams, $location, toaster, $modalInstance, listaReuniaoProposicoes) {

		var self = this;
		$scope.disabled = false;
		$scope.showDetalhamentoComentario = false;
		$scope.$location = $location;
		$scope.listaReuniaoProposicoes = listaReuniaoProposicoes;

		$scope.ok = function() {
			$modalInstance.close();
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
});