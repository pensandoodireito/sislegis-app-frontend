angular.module('sislegisapp').controller('SituacaoLegislativaController',
		function($scope, $http, SituacaoLegislativaFactory, ComissaoResource, BACKEND) {
			
		
			$scope.origens = [ {
				value : 'C',
				displayName : 'Câmara'
			}, {
				value : 'S',
				displayName : 'Senado'
			} ];

			$scope.selectOrigemComissoes = function() {
				var origemSelecionada = $scope.origem.value;
				if (origemSelecionada == 'S') {
					$scope.situacoes=SituacaoLegislativaFactory.query({casa:"SENADO"});
					
				} else if (origemSelecionada == 'C') {
					$scope.situacoes=SituacaoLegislativaFactory.query({casa:"CAMARA"});
				}

			};

			$scope.currentPage = 0;
			$scope.pageSize = 10;
			$scope.searchResults = [];
			$scope.filteredResults = [];
			$scope.pageRange = [];
			$scope.numberOfPages = function() {
				var total = 0;
				if (typeof $scope.comissoes != 'undefined') {
					total = $scope.comissoes.length;
				}
				var result = Math.ceil(total / $scope.pageSize);
				var max = (result == 0) ? 1 : result;
				$scope.pageRange = [];
				for (var ctr = 0; ctr < max; ctr++) {
					$scope.pageRange.push(ctr);
				}
				return max;
			};

			$scope.previous = function() {
				if ($scope.currentPage > 0) {
					$scope.currentPage--;
				}
			};

			$scope.next = function() {
				if ($scope.currentPage < ($scope.numberOfPages() - 1)) {
					$scope.currentPage++;
				}
			};

			$scope.setPage = function(n) {
				$scope.currentPage = n;
			};
			$scope.numberOfPages();

		});