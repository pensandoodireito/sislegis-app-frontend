angular.module('sislegisapp').controller('ModalRelatorioReuniaoController',
    function($scope, $http, $filter, $routeParams, $location, toaster, $modalInstance, listaReuniaoProposicoes, filtroGlobal, filtroOrigem, filtroComissao, filtroFavorita, filtroTags, filtroResponsavel, filtroPosicionamento, filtroResponsavelNaoDefinido, filtroPosicionamentoNaoDefido, printPath) {
		var self = this;
		$scope.disabled = false;
		$scope.showDetalhamentoComentario = false;
		$scope.$location = $location;
		$scope.listaReuniaoProposicoes = listaReuniaoProposicoes;
		$scope.filtroGlobal = filtroGlobal;
		$scope.filtroOrigem = filtroOrigem;
		$scope.filtroComissao = filtroComissao;
		$scope.filtroFavorita = filtroFavorita;
		$scope.filtroTags = filtroTags;
        $scope.filtroResponsavel = filtroResponsavel;
        $scope.filtroPosicionamento = filtroPosicionamento;
        $scope.filtroResponsavelNaoDefinido = filtroResponsavelNaoDefinido;
        $scope.filtroPosicionamentoNaoDefido = filtroPosicionamentoNaoDefido;
        $scope.printPath = printPath;

		$scope.ok = function() {
			$modalInstance.close();
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
});