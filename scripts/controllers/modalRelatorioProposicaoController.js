angular.module('sislegisapp').controller('ModalRelatorioProposicaoController',
	function($scope, $http, $filter, $routeParams, $location, toaster, $modalInstance, proposicao, printPath) {
		var self = this;
		$scope.disabled = false;
		$scope.showDetalhamentoComentario = true;
		$scope.$location = $location;
		$scope.proposicao = proposicao;
        $scope.printPath  = printPath;

		$scope.ok = function() {
			$modalInstance.close();
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
});