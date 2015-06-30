angular.module('sislegisapp').controller('ModalBuscarProposicaoController',
				function($scope, $http, $filter, $routeParams, $location, toaster,
						$modalInstance, ProposicaoResource, reuniao,
						reuniaoProposicao, listaProposicaoSelecao) {
					
					var self = this;
					$scope.disabled = false;
					$scope.showDetalhamentoProposicao = false;
					$scope.$location = $location;
					$scope.campoData = new Date();

					$scope.comissao = new Object();
					$scope.reuniao = reuniao;
					
					$scope.reuniaoProposicao = reuniaoProposicao;

					$scope.listaProposicaoSelecao = [];
					$scope.listaProposicaoPesquisa = {};

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
							$scope.proposicoes = sucess;
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
								idComissao : $scope.comissao.id, // usado para a camara
								siglaComissao : $scope.comissao.sigla, // usado para o senado
								data : formattedDate
							}, successCallback, errorCallback);
						}
					};

					$scope.detalharProposicao = function(p) {
						$http({
							method: 'GET',
							url: ($scope.origem.value == 'C') ? "http://localhost:8080/sislegis/rest/proposicaos/detalharProposicaoCamaraWS"
									: "http://localhost:8080/sislegis/rest/proposicaos/detalharProposicaoSenadoWS",
							params : {'id' : p.idProposicao}
						}).success(function(data) {
							$scope.detalheProposicao = data;
							$scope.detalheProposicao.comissao = p.comissao;
							$scope.detalheProposicao.seqOrdemPauta = p.seqOrdemPauta;
							$scope.showDetalhamentoProposicao = true;
						}).error(function(error) {
						});
					};

					$scope.adicionarProposicao = function(proposicao) {
						// condicional para evitar itens duplicados
						if ($scope.listaProposicaoSelecao.indexOf(proposicao) == -1) {
							proposicao.listaReuniaoProposicoes = proposicao.listaReuniaoProposicoes || [];
							proposicao.listaReuniaoProposicoes.push($scope.reuniaoProposicao);
							proposicao.reuniao = $scope.reuniao;
							$scope.listaProposicaoSelecao.push(proposicao);
						} else {
							toaster.pop('info', 'Proposição já selecionada');
						}
					};

					$scope.removerProposicao = function(proposicao) {
						var index = $scope.listaProposicaoSelecao
								.indexOf(proposicao)
						$scope.listaProposicaoSelecao.splice(index, 1);
					};

					$scope.salvar = function() {

				        var successCallback = function(){
				        	$modalInstance.close($scope.listaProposicaoSelecao);
				        };
				        var errorCallback = function() {
				        	toaster.pop('info', 'Proposição já adicionada para a Reunião selecionada');
				        };

				        ProposicaoResource.salvarProposicoes($scope.listaProposicaoSelecao,
								successCallback, errorCallback);
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
							$http.get('http://localhost:8080/sislegis/rest/comissaos/comissoesSenado')
									.success(function(data) {
										$scope.comissoes = data;
									}).error(function(error) {
									});
						} else if (origemSelecionada == 'C') {
							$http.get('http://localhost:8080/sislegis/rest/comissaos/comissoesCamara')
									.success(function(data) {
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
