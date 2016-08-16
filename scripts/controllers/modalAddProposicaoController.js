angular.module('sislegisapp')
    .controller(
        'ModalAddProposicaoController',
        function ($scope, $http, $filter, $routeParams, $location, toaster, $modalInstance, ProposicaoResource,
            BACKEND) {

            var self = this;
            $scope.disabled = false;
            $scope.showDetalhamentoProposicao = false;
            $scope.$location = $location;
            $scope.campoData = new Date();

            $scope.comissao = new Object();

            //					$scope.listaProposicaoSelecao = [];
            //					$scope.listaProposicaoPesquisa = {};

            //					$scope.pesquisar = function() {
            //						$modalInstance.close($scope.listaProposicaoSelecao);
            //					};

            $scope.ok = function () {
                $modalInstance.close($scope.listaProposicaoSelecao);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.buscarProposicao = function () {
                if (!$scope.origem || !$scope.filtro.ano || !$scope.filtro.tipo) {
                    toaster.pop('info', 'Selecione uma origem, tipo e ano.');
                    return;
                }
                var successCallback = function (arg) {
                    $scope.detalheProposicao = null;
                    $scope.showDetalhamentoProposicao = false;
                    $scope.proposicoes = sucess;
                    $scope.comissaoProposicao = $scope.comissao.sigla;
                };
                var errorCallback = function () {
                };

                var url = BACKEND + "/proposicaos/buscaIndependente/";
                url += ($scope.origem.value == 'C') ? "CAMARA" : "SENADO";
                url += "/" + $scope.filtro.tipo.sigla.trim();
                url += "/" + $scope.filtro.ano;
                $http({
                    method: 'GET',
                    url: url,
                    params: {
                        'numero': $scope.filtro.numero
                    }
                }).success(function (data) {
                    console.log("success", data);
                    $scope.proposicoes = data;
                    if (data.length == 0) {
                        toaster.pop('info', 'Nenhuma proposição encontrada.');
                    }
                }).error(function (err) {
                    console.log("error", err);
                    toaster.pop('error', 'Houve um erro consultado o servidor. Por favor tente novamente.');
                });
            };

            $scope.origens = [{
                value: 'C',
                displayName: 'Câmara',
                tipos: null
            }, {
                    value: 'S',
                    displayName: 'Senado',
                    tipos: null
                }];

            $scope.tipos = [];
            $scope.filtro = {
                tipo: null,
                numero: null,
                ano: null
            };

            $scope.selectOrigem = function () {
                if ($scope.origem) {
                    var origemSelecionada = $scope.origem.value;
                    if (origemSelecionada == 'S') {
                        if ($scope.origens[1].tipos == null) {
                            $http.get(BACKEND + '/proposicaos/listTipos/SENADO').success(function (data) {
                                $scope.origens[1].tipos = data;
                                $scope.tipos = $scope.origens[1].tipos;
                            }).error(function (error) {
                            });
                        } else {
                            $scope.tipos = $scope.origens[1].tipos;
                        }
                    } else if (origemSelecionada == 'C') {
                        if ($scope.origens[0].tipos == null) {
                            $http.get(BACKEND + '/proposicaos/listTipos/CAMARA').success(function (data) {
                                $scope.origens[0].tipos = data;
                                $scope.tipos = $scope.origens[0].tipos;
                            }).error(function (error) {
                            });
                        } else {
                            $scope.tipos = $scope.origens[0].tipos;
                        }
                    }
                }

            };

            $scope.adicionarProposicao = function (proposicao) {
                console.log(proposicao, "proposicao adicionada");
                var successCallback = function (result, arg2) {
                    console.log(result, arg2)
                    toaster.pop('info', 'Proposição adicionada');
                };
                var errorCallback = function () {
                    toaster.pop('info', 'Proposição já adicionada para a Reunião selecionada');
                };

                ProposicaoResource.salvarProposicaoIndependente(proposicao, successCallback, errorCallback);
            };

        });
