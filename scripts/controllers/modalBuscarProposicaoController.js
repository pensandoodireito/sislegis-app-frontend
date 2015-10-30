angular.module('sislegisapp').controller(
		'ModalBuscarProposicaoController',
		function($scope, $http, $filter, $routeParams, $location, toaster, $modalInstance, ProposicaoResource, reuniao,
				reuniaoProposicao, listaProposicaoSelecao, BACKEND) {

			var self = this;
			$scope.disabled = false;
			$scope.showDetalhamentoProposicao = false;
			$scope.$location = $location;
			$scope.campoData = new Date(reuniao.data);

			$scope.comissao = new Object();
			$scope.reuniao = reuniao;

			$scope.reuniaoProposicao = reuniaoProposicao;

			$scope.listaProposicaoSelecao = [];
			$scope.listaProposicaoPesquisa = {};
			$scope.pautaReuniao = [];
			$scope.pautaReuniaoSelecao = {};

			$scope.pesquisar = function() {
				$modalInstance.close($scope.listaProposicaoSelecao);
			};

			$scope.ok = function() {
				$modalInstance.close($scope.listaProposicaoSelecao);
			};

			$scope.cancel = function() {
				$modalInstance.dismiss('cancel');
			};

			$scope.buscarProposicao = function() {
				var formattedDate = $filter('date')(new Date($scope.campoData), 'MM/dd/yyyy');

				var successCallback = function(sucess) {
					$scope.detalheProposicao = null;
					$scope.showDetalhamentoProposicao = false;
					$scope.pautaReuniao = sucess;
					$scope.comissaoProposicao = $scope.comissao.sigla;
				};
				var errorCallback = function() {
				};

				if ($scope.origem.value == 'C') {
					ProposicaoResource.buscarCamara({
						idComissao : $scope.comissao.id,
						siglaComissao : $scope.comissao.sigla,
						data : formattedDate
					}, successCallback, errorCallback);
				} else {
					ProposicaoResource.buscarSenado({
						idComissao : $scope.comissao.id, // usado para a
						// camara
						siglaComissao : $scope.comissao.sigla, // usado para o
						// senado
						data : formattedDate
					}, successCallback, errorCallback);
				}
			};

			$scope.detalharProposicao = function(p) {
				$http(
						{
							method : 'GET',
							url : ($scope.origem.value == 'C') ? BACKEND + "/proposicaos/detalharProposicaoCamaraWS"
									: BACKEND + "/proposicaos/detalharProposicaoSenadoWS",
							params : {
								'id' : p.idProposicao
							}
						}).success(function(data) {
					$scope.detalheProposicao = data;
					$scope.detalheProposicao.comissao = p.comissao;
					$scope.detalheProposicao.seqOrdemPauta = p.seqOrdemPauta;
					$scope.showDetalhamentoProposicao = true;
				}).error(function(error) {
				});
			};

			$scope.adicionarProposicao = function(pauta,proposicaoPauta) {
				// var proposicao = proposicaoPauta.proposicao;
				// condicional para evitar itens duplicados
				if ($scope.listaProposicaoSelecao.indexOf(proposicaoPauta) == -1) {

					proposicaoPauta.pautaReuniaoComissao = {
						codigoReuniao : pauta.codigoReuniao
					};
					proposicaoPauta.proposicao.reuniao = $scope.reuniao;
					$scope.pautaReuniaoSelecao[pauta.codigoReuniao] = pauta;
					$scope.listaProposicaoSelecao.push(proposicaoPauta);
				} else {
					toaster.pop('info', 'Proposição já selecionada');
				}
			};

			$scope.removerProposicao = function(proposicaoPauta) {
				var index = $scope.listaProposicaoSelecao.indexOf(proposicaoPauta)
				$scope.listaProposicaoSelecao.splice(index, 1);
			};

			$scope.salvar = function() {

				var successCallback = function() {
					$modalInstance.close($scope.listaProposicaoSelecao);
				};
				var errorCallback = function() {
					toaster.pop('info', 'Proposição já adicionada para a Reunião selecionada');
				};

				var listaDePautaReunioesSelecionadas = [];
				for ( var pautaId in $scope.pautaReuniaoSelecao) {
					var pauta = $scope.pautaReuniaoSelecao[pautaId];

					for (var index = 0; index < pauta.proposicoesDaPauta.length; index++) {
						var proposicaoPauta = pauta.proposicoesDaPauta[index];
						if ($scope.listaProposicaoSelecao.indexOf(proposicaoPauta) == -1) {
							var indexToRemove = pauta.proposicoesDaPauta.indexOf(proposicaoPauta)
							pauta.proposicoesDaPauta.splice(indexToRemove, 1);
							index--;
						}
					}
					if (pauta.proposicoesDaPauta.length > 0) {
						listaDePautaReunioesSelecionadas.push(pauta);
					}
				}
				ProposicaoResource.salvarProposicoesDePauta({
					pautaReunioes : listaDePautaReunioesSelecionadas,
					reuniaoDate : new Date($scope.reuniao.data).getTime()

				}, successCallback, errorCallback);
			};

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
					$http.get(BACKEND + '/comissaos/comissoesSenado').success(function(data) {
						$scope.comissoes = data;
					}).error(function(error) {
					});
				} else if (origemSelecionada == 'C') {
					$http.get(BACKEND + '/comissaos/comissoesCamara').success(function(data) {
						$scope.comissoes = data;
					}).error(function(error) {
					});
				}

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
