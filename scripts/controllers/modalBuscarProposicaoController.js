angular.module('sislegisapp').controller(
    'ModalBuscarProposicaoController',
    function ($scope, $http, $filter, $routeParams, $location, toaster, $modalInstance, ProposicaoResource, reuniao,
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
        $scope.origem = {
            value: ''
        }

        $scope.pesquisar = function () {
            $modalInstance.close($scope.listaProposicaoSelecao);
        };

        $scope.ok = function () {
            $modalInstance.close($scope.listaProposicaoSelecao);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.buscarProposicaoAvulsa = function () {
            var origem = ($scope.origem.value == 'C') ? "CAMARA" : "SENADO";;
            var sigla = $scope.tipo.sigla.trim();
            var numero = $scope.numero;
            var ano = $scope.ano;
            var params = { "origem": origem, "sigla": sigla, "ano": ano };
            if (undefined !== numero && numero != '') {
                params.numero = numero;
            }

            ProposicaoResource.buscarAvulsas(params, function (proposicoesAvulsas) {
                $scope.pautaReuniao = [];
                if (proposicoesAvulsas.length == 0) {
                    toaster.pop('info', 'Nenhuma proposição encontrada');
                }
                proposicoesAvulsas.forEach(function (prop) {
                    if ($scope.comissao != null && $scope.comissao.sigla) {
                        prop.comissao = $scope.comissao.sigla.trim();
                    }
                });
                $scope.pautaReuniao = proposicoesAvulsas;

            });
        };

        $scope.mostrarAvulsa = function () {
            $scope.selectOrigem();
            $scope.habilitaAvulsa = true;
        };

        $scope.esconderAvulsa = function () {
            $scope.habilitaAvulsa = false;
        };


        $scope.selectOrigem = function () {
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

        };

        $scope.buscarProposicao = function () {

            var formattedDate = $filter('date')(new Date($scope.campoData), 'MM/dd/yyyy');

            var successCallback = function (sucess) {
                $scope.detalheProposicao = null;
                $scope.showDetalhamentoProposicao = false;
                $scope.pautaReuniao = sucess;
                // $scope.naoEncontrado = sucess.length == 0;
                if (sucess.length == 0) {
                    toaster.pop('info', 'Nenhuma proposição encontrada');
                }
                $scope.comissaoProposicao = $scope.comissao.sigla;
            };

            var errorCallback = function (err) { };

            if ($scope.origem.value == 'C') {
                ProposicaoResource.buscarCamara({
                    idComissao: $scope.comissao.id,
                    siglaComissao: $scope.comissao.sigla,
                    data: formattedDate
                }, successCallback, errorCallback);
            } else {
                ProposicaoResource.buscarSenado({
                    idComissao: $scope.comissao.id, // usado para a
                    // camara
                    siglaComissao: $scope.comissao.sigla, // usado para o
                    // senado
                    data: formattedDate
                }, successCallback, errorCallback);
            }
        };

        $scope.detalharProposicao = function (p) {
            $http(
                {
                    method: 'GET',
                    url: ($scope.origem.value == 'C') ? BACKEND + "/proposicaos/detalharProposicaoCamaraWS"
                        : BACKEND + "/proposicaos/detalharProposicaoSenadoWS",
                    params: {
                        'id': p.idProposicao
                    }
                }).success(function (data) {
                    $scope.detalheProposicao = data;
                    $scope.detalheProposicao.comissao = p.comissao;
                    $scope.detalheProposicao.seqOrdemPauta = p.seqOrdemPauta;
                    $scope.showDetalhamentoProposicao = true;
                }).error(function (error) {
                });
        };

        $scope.adicionarProposicao = function (pauta, proposicaoPauta) {
            // var proposicao = proposicaoPauta.proposicao;
            // condicional para evitar itens duplicados
            if ($scope.listaProposicaoSelecao.indexOf(proposicaoPauta) == -1) {

                proposicaoPauta.pautaReuniaoComissao = {
                    codigoReuniao: pauta.codigoReuniao
                };
                proposicaoPauta.proposicao.reuniao = $scope.reuniao;
                $scope.pautaReuniaoSelecao[pauta.codigoReuniao] = pauta;
                $scope.listaProposicaoSelecao.push(proposicaoPauta);
            } else {
                toaster.pop('info', 'Proposição já selecionada');
            }
        };

        $scope.removerProposicao = function (proposicaoPauta) {
            var index = $scope.listaProposicaoSelecao.indexOf(proposicaoPauta)
            $scope.listaProposicaoSelecao.splice(index, 1);
        };

        $scope.salvar = function () {

            var successCallback = function () {
                $modalInstance.close($scope.listaProposicaoSelecao);
            };
            var errorCallback = function () {
                toaster.pop('info', 'Proposição já adicionada');
            };

            var listaDePautaReunioesSelecionadas = [];
            for (var pautaId in $scope.pautaReuniaoSelecao) {
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
                pautaReunioes: listaDePautaReunioesSelecionadas,
                reuniaoDate: new Date($scope.reuniao.data).getTime()

            }, successCallback, errorCallback);
        };

        $scope.origens = [{
            value: 'C',
            displayName: 'Câmara'
        }, {
                value: 'S',
                displayName: 'Senado'
            }];
        $scope.comissoesCache = {
            'C': null,
            'S': null

        };
        $scope.selectOrigemComissoes = function () {

            switch ($scope.origem.value) {
                case 'S':
                    url = BACKEND + '/comissaos/comissoesSenado';
                    break;
                case 'C':
                    url = BACKEND + '/comissaos/comissoesCamara';
                    break;
                default:
                    break;
            }
            if ($scope.comissoesCache[$scope.origem.value]) {
                $scope.comissoes = $scope.comissoesCache[$scope.origem.value];
            } else {
                $http.get(url).success(function (data) {
                    $scope.comissoesCache[$scope.origem.value] = data;
                    $scope.comissoes = data;
                }).error(function (error) {
                });
            }

        };

        // CALENDARIO
        $scope.setCalendar = function () {
            $scope.openCalendar = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            $scope.format = 'dd/MM/yyyy';
        }

        $scope.setCalendar();
        $scope.habilitaAvulsa = true;

    });
