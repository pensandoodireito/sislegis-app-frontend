angular.module('sislegisapp').controller('NotificacaoController',
		function($scope, $routeParams, $location, $rootScope, $timeout, $modal, toaster, NotificacaoResource) {
			$('.dropdown-toggle').click(function(e) {
				e.preventDefault();
				if ($scope.notificationsopen != true) {
					$scope.notificationsopen = true;
					$scope.onDropdown();
				} else {
					$scope.notificationsopen = false;
					$scope.onDropup();
				}
				return false;
			});
			$scope.notificationsopen = false;
			$scope.listaNotificacaoTarefas = [];
			$(".notifications-menu").on("show.bs.dropdown", function(event) {
				$scope.onDropdown();
			});
			$scope.onDropdown = function() {
				for (var i = 0; i < $scope.listaNotificacaoTarefas.length; i++) {
					var notificacao = $scope.listaNotificacaoTarefas[i];
					console.log("checnadno ", notificacao, notificacao.visualizada);
					if (!notificacao.visualizada) {
						console.log("Agendando setador de visualizacao");
						$scope.updateViewedHandler = $timeout($scope.setCurrentNotificationsViewed, 2000);
						break;
					}
				}
			};
			$scope.onDropup = function() {
				if ($scope.updateViewedHandler) {
					$timeout.cancel($scope.updateViewedHandler);
				}
			};
			$(".notifications-menu").on("hidden.bs.dropdown", function(event) {
				$scope.onDropup();
			});

			$scope.setCurrentNotificationsViewed = function() {
				var successCallback = function(data) {
					for (var i = 0; i < $scope.listaNotificacaoTarefas.length; i++) {
						var notificacao = $scope.listaNotificacaoTarefas[i];
						if (!notificacao.visualizada) {
							notificacao.visualizada = true;
						}
					}

				};
				var errorCallback = function() {

				};

				var ids = [];
				for (var i = 0; i < $scope.listaNotificacaoTarefas.length; i++) {
					var notificacao = $scope.listaNotificacaoTarefas[i];
					if (!notificacao.visualizada) {
						ids.push(notificacao.id);
					}
				}
				NotificacaoResource.markvisualizadas(ids, successCallback, errorCallback);

				for (var i = 0; i < $scope.listaNotificacaoTarefas.length; i++) {
					var notificacao = $scope.listaNotificacaoTarefas[i];
					notificacao.visualizada = true;
				}
			}

			$scope.getListaNotificacaoTarefas = function() {
				var successCallback = function(data) {
					console.log("Lista tarefas", data)
					$scope.listaNotificacaoTarefas = data;
				};
				var errorCallback = function() {
					toaster.pop('error', 'Erro ao lista tarefas do usuario');
				};

				NotificacaoResource.buscarPorUsuario({
					categoria : "TAREFAS"
				}, successCallback, errorCallback);

			}
			
			$rootScope.$on('updateEncaminhamentos', function(event) {
				$scope.getListaNotificacaoTarefas();
			});
			$rootScope.$on('updateTarefas', function(event) {
				$scope.getListaNotificacaoTarefas();
			});

			$scope.getListaNotificacaoTarefas();
		});
