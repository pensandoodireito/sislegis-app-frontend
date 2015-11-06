angular.module('sislegisapp').controller(
		'ModalEncaminhamentosController',
		function($scope, $rootScope, $http, $filter, $routeParams, $location, $modalInstance, toaster, proposicao,
				TipoEncaminhamentoResource, ProposicaoResource, EncaminhamentoProposicaoResource, UsuarioResource,
				ComentarioResource, BACKEND) {

			var self = this;
			$scope.disabled = false;
			$scope.$location = $location;

			$scope.proposicao = proposicao || new ProposicaoResource();
			$scope.tipoEncaminhamento = new TipoEncaminhamentoResource();
			$scope.encaminhamentoProposicao = new EncaminhamentoProposicaoResource();
			$scope.listaEncaminhamento = TipoEncaminhamentoResource.queryAll() || [];

			$scope.getUsuarios = function(val) {
				return $http.get(BACKEND + '/usuarios/find', {
					params : {
						nome : val
					}
				}).then(function(response) {
					return response.data.map(function(item) {
						return item;
					});
				});
			};

			$scope.ok = function() {
				$modalInstance.close($scope.proposicao);
			};

			$scope.cancel = function() {
				$modalInstance.dismiss('cancel');
			};

			$scope.isClean = function() {
				return angular.equals(self.original, $scope.encaminhamentoProposicao);
			};

			$scope.openUpdate = function(item) {
				$scope.encaminhamentoProposicao = new EncaminhamentoProposicaoResource(item);
			};

			$scope.update = function() {
				$scope.encaminhamentoProposicao.proposicao = new ProposicaoResource();
				$scope.encaminhamentoProposicao.proposicao.id = $scope.proposicao.id;

				var successCallback = function() {
					EncaminhamentoProposicaoResource.findByProposicao({
						ProposicaoId : $scope.proposicao.id
					}, function(data) {
						$scope.proposicao.listaEncaminhamentoProposicao = data;
						$scope.encaminhamentoProposicao = new EncaminhamentoProposicaoResource();
						$scope.tipoEncaminhamento = new TipoEncaminhamentoResource();
						toaster.pop('success', 'Encaminhamento atualizado com sucesso');
					});
				};
				var errorCallback = function() {
					$scope.encaminhamentoProposicao = new EncaminhamentoProposicaoResource();
					toaster.pop('error', 'Falha ao realizar operação.');
				};
				$scope.encaminhamentoProposicao.$update({
					EncaminhamentoProposicaoId : $scope.encaminhamentoProposicao.id
				}, successCallback, errorCallback);
			};

			$scope.save = function() {

				$scope.encaminhamentoProposicao.proposicao = new ProposicaoResource();
				$scope.encaminhamentoProposicao.proposicao.id = $scope.proposicao.id;
				if ($scope.encaminhamentoProposicao.dataHoraLimite != null) {
					$scope.encaminhamentoProposicao.dataHoraLimite = $scope.encaminhamentoProposicao.dataHoraLimite
							.getTime();
				}

				var successCallback = function(data, responseHeaders) {
					EncaminhamentoProposicaoResource.findByProposicao({
						ProposicaoId : $scope.proposicao.id
					}, function(data) {
						$scope.proposicao.listaEncaminhamentoProposicao = data;
						$scope.proposicao.totalEncaminhamentos++;
						$scope.encaminhamentoProposicao = new EncaminhamentoProposicaoResource();
						$scope.tipoEncaminhamento = new TipoEncaminhamentoResource();
						$rootScope.$emit('updateTarefas');
						toaster.pop('success', 'Encaminhamento inserido com sucesso');
					});
				};
				var errorCallback = function() {
					toaster.pop('error', 'Falha ao realizar operação.');
				};
				EncaminhamentoProposicaoResource.save($scope.encaminhamentoProposicao, successCallback, errorCallback);
			};

			// CALENDARIO
			$scope.setCalendar = function() {
				$scope.openCalendar = function($event) {
					$event.preventDefault();
					$event.stopPropagation();

					$scope.opened = true;
				};

				$scope.dateOptions = {
					formatYear : 'yy',
					startingDay : 1
				};

				$scope.format = 'dd/MM/yyyy';
			}

			$scope.setCalendar();

		});
