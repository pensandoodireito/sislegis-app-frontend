angular.module('sislegisapp').controller(
		'SearchAgendaComissaoController',
		function($scope, $http, AgendaComissaoFactory, ComissaoResource,
				BACKEND) {
			$scope.seguidas = [];
			$scope.isSeguida = function(comissao) {
				for (var i = 0; i < $scope.seguidas.length; i++) {
					var agenda = $scope.seguidas[i];

					console.log("agenda", agenda);
					if (comissao.trim() == agenda) {
						return true;
					}
				}
				return false;
			}
			AgendaComissaoFactory.listSeguidas(function(data) {
				$scope.seguidas = data;
				for (var i = 0; i < data.length; i++) {
					var agenda = data[i];
					$scope.seguidas.push(agenda.comissao);
				}
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
			$scope.search = {};
			$scope.naoseguir = function(comissao) {
				AgendaComissaoFactory.unfollow({
					comissao : comissao.trim()
				}, function() {
					console.log("success");
					for (var i = 0; i < $scope.seguidas.length; i++) {
						var agenda = $scope.seguidas[i];

						console.log("agenda", agenda);
						if (comissao.trim() == agenda) {
							$scope.seguidas[i] = null;
							$scope.selectOrigemComissoes();
							return;
						}
					}

				});

			};
			$scope.seguir = function(comissao) {
				console.log(AgendaComissaoFactory.follow({
					comissao : comissao.trim()
				}, function() {
					$scope.seguidas.push(comissao.trim());
					$scope.selectOrigemComissoes();
				}));

			};
			$scope.currentPage = 0;
			$scope.pageSize = 10;
			$scope.searchResults = [];
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

		});