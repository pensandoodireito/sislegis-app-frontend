angular.module('sislegisapp').controller(
    'ModalBuscarProposicaoController',
    function ($scope, $http, $filter, $routeParams, $location, toaster, $modalInstance, ProposicaoResource, reuniao,
        reuniaoProposicao, listaProposicaoSelecao, BACKEND) {

        var self = this;
        $scope.disabled = false;
        $scope.showDetalhamentoProposicao = false;
        $scope.$location = $location;
        if (reuniao == null) {
            reuniao = {
                data: new Date()
            }
        }
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

        $scope.tiposPadraoCamara = [
            { sigla: "MPV ", nome: "MPV - Medida Provisória" },
            { sigla: "PEC ", nome: "PEC - Proposta de Emenda à Constituição" },
            { sigla: "PL ", nome: "PL - Projeto de Lei" },
            { sigla: "PLC ", nome: "PLC - Projeto de Lei da Câmara" },
            { sigla: "PLS ", nome: "PLS - Projeto de Lei do Senado Federal" },
            { sigla: "", nome: "-- Carregar Todos os Tipos -- ", virtual: true }
        ];
        $scope.tiposPadraoSenado = [
            { sigla: "MPV ", nome: "MPV - Medida Provisória" },
            { sigla: "PEC ", nome: "PEC - Proposta de Emenda à Constituição" },
            { sigla: "PL ", nome: "PL - Projeto de Lei" },
            { sigla: "PLC ", nome: "PLC - Projeto de Lei da Câmara" },
            { sigla: "PLS ", nome: "PLS - Projeto de Lei do Senado Federal" },
            { sigla: "", nome: "-- Carregar Todos os Tipos -- ", virtual: true }
        ];

        $scope.origens = [{
            value: 'C',
            displayName: 'Câmara',
            tipos: $scope.tiposPadraoCamara
        }, {
                value: 'S',
                displayName: 'Senado',
                tipos: $scope.tiposPadraoSenado
            }];

        $scope.pesquisar = function () {
            $modalInstance.close($scope.listaProposicaoSelecao);
        };

        $scope.ok = function () {
            $modalInstance.close($scope.listaProposicaoSelecao);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.proposicoesAvulsas = [];
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
                $scope.proposicoesAvulsas = proposicoesAvulsas;

            });
        };

        $scope.mostrarAvulsa = function () {
            $scope.selectOrigem();
            $scope.habilitaAvulsa = true;
        };

        $scope.esconderAvulsa = function () {
            $scope.habilitaAvulsa = false;
            $scope.selectOrigemComissoes();
        };


        $scope.selectTipo = function () {
            console.log($scope.tipo);

            if ($scope.tipo.virtual == true) {
                var origemSelecionada = $scope.origem.value;
                if (origemSelecionada == 'S') {
                    $http.get(BACKEND + '/proposicaos/listTipos/SENADO').success(function (data) {
                        $scope.tiposPadraoSenado.splice($scope.tiposPadraoSenado.length - 1);
                        $scope.origens[1].tipos = $scope.tiposPadraoSenado.slice();;
                        $scope.origens[1].tipos = $scope.origens[1].tipos.concat(data);
                        $scope.tipos = $scope.origens[1].tipos;
                    }).error(function (error) {
                    });
                } else if (origemSelecionada == 'C') {
                    $http.get(BACKEND + '/proposicaos/listTipos/CAMARA').success(function (data) {
                        $scope.tiposPadraoCamara.splice($scope.tiposPadraoCamara.length - 1);
                        $scope.origens[0].tipos = $scope.tiposPadraoCamara.slice();

                        $scope.origens[0].tipos = $scope.origens[0].tipos.concat(data);

                        $scope.tipos = $scope.origens[0].tipos;
                    }).error(function (error) {
                    });
                }
            }
        }

        $scope.selectOrigem = function () {
            var origemSelecionada = $scope.origem.value;
            if (origemSelecionada == 'S') {

                $scope.tipos = $scope.origens[1].tipos;

            } else if (origemSelecionada == 'C') {

                $scope.tipos = $scope.origens[0].tipos;

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
        $scope.listaProposicaoAvulsaSelecao = [];
        $scope.adicionarProposicaoAvulsa = function (prop) {
            if ($scope.listaProposicaoAvulsaSelecao.indexOf(prop) == -1) {
                $scope.listaProposicaoAvulsaSelecao.push(prop);
            }
        }
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

        $scope.removerProposicao = function (proposicao, pauta) {
            if (pauta != null) {
                var index = $scope.listaProposicaoSelecao.indexOf(pauta);
                $scope.listaProposicaoSelecao.splice(index, 1);
            } else {
                var index2 = $scope.listaProposicaoAvulsaSelecao.indexOf(proposicao);
                $scope.listaProposicaoAvulsaSelecao.splice(index2, 1);
            }
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
            if ($scope.listaProposicaoAvulsaSelecao.length > 0) {
                ProposicaoResource.salvarProposicoesExtras($scope.listaProposicaoAvulsaSelecao);
            }
            ProposicaoResource.salvarProposicoesDePauta({
                pautaReunioes: listaDePautaReunioesSelecionadas,
                reuniaoDate: new Date($scope.reuniao.data).getTime()

            }, successCallback, errorCallback);
        };


        $scope.comissoesCache = {
            'C': null,
            'S': null

        };
        $scope.selectOrigemComissoes = function () {
            var origemSelecionada = $scope.origem.value;
            if (origemSelecionada != null) {
                var url = '';
                switch (origemSelecionada) {
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
