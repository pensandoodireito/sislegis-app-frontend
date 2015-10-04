angular.module('sislegisapp').controller(
		'SearchAgendaComissaoController',
		function($scope, $http, AgendaComissaoFactory, ComissaoResource,
				BACKEND) {
			$scope.seguidas = [];
			$scope.getCasa = function() {
				return $scope.origem.value == 'C' ? 'CAMARA' : 'SENADO';
			};
			$scope.getIndexAgenda = function(comissao) {
				var casaAtual = $scope.getCasa();

				for (var i = 0; i < $scope.seguidas.length; i++) {
					var agenda = $scope.seguidas[i];

					if (agenda.casa == casaAtual) {

						if (comissao.trim() == agenda.comissao) {

							return i;
						}
					}
				}
				return -1;
			};

			$scope.isSeguida = function(comissao) {

				return $scope.getIndexAgenda(comissao.trim()) != -1;
			};
			AgendaComissaoFactory.listSeguidas(function(data) {
				$scope.seguidas = data;
			});

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
					$http.get(BACKEND + '/comissaos/comissoesSenado').success(
							function(data) {
								$scope.comissoes = data;
								$scope.numberOfPages();
							}).error(function(error) {
					});
				} else if (origemSelecionada == 'C') {
					$http.get(BACKEND + '/comissaos/comissoesCamara').success(
							function(data) {
								$scope.comissoes = data;
								$scope.numberOfPages();
							}).error(function(error) {
					});
				}

			};
			$scope.naoseguir = function(comissao) {
				AgendaComissaoFactory.unfollow({
					casa : $scope.getCasa(),
					comissao : comissao.trim()
				}, function() {
					console.log("success");
					var index = $scope.getIndexAgenda(comissao);
					$scope.seguidas.splice(index, 1);
					$scope.selectOrigemComissoes();

				});

			};
			$scope.seguir = function(comissao) {
				console.log(AgendaComissaoFactory.follow({
					casa : $scope.getCasa(),
					comissao : comissao.trim()
				}, function() {
					var agendaTmp = {
						comissao : comissao.trim(),
						casa : $scope.getCasa()
					};
					$scope.seguidas.push(agendaTmp);
					$scope.selectOrigemComissoes();
				}));

			};
			$scope.currentPage = 0;
			$scope.pageSize = 10;
			$scope.searchResults = [];
			$scope.filteredResults = [];
			$scope.pageRange = [];
			$scope.numberOfPages = function() {
				var result = Math.ceil($scope.pageSize);
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