angular.module('sislegisapp').controller('RelatorioController',
    function ($scope, $rootScope, $http, $filter, $routeParams, $location, $log, $timeout, toaster,
        ProposicaoResource, ComentarioResource, PosicionamentoResource, EncaminhamentoProposicaoResource, VotacaoResource, ComissaoResource, BACKEND, tipo, $q) {

        $rootScope.title = 'Ministério da Justiça e Cidadania';
        $scope.tipo = tipo;
        $scope.comissoes = {
            senado: {},
            camara: {},
            loadedCamara: false,
            loadedSenado: false
        }
        ComissaoResource.fetchComissoesCamara(function (data) {
            for (var index = 0; index < data.length; index++) {
                var comissao = data[index];
                $scope.comissoes.camara[comissao.sigla.trim()] = comissao;
            }
            $scope.comissoes.loadedCamara = true;

        });
        ComissaoResource.fetchComissoesSenado(function (data) {
            for (var index = 0; index < data.length; index++) {
                var comissao = data[index];
                $scope.comissoes.senado[comissao.sigla.trim()] = comissao;
            }
            $scope.comissoes.senado["PLEN"] = { sigla: "PLEN", nome: "Plenário do Congresso Nacional" }
            $scope.comissoes.loadedSenado = true;

        });


        $scope.getNomeComissao = function (origem, sigla) {


            var comissao = {};
            if (origem == 'CAMARA') {


                comissao = $scope.comissoes.camara[sigla];


            } else {

                comissao = $scope.comissoes.senado[sigla];


            }
            if (!comissao || comissao.nome == null || comissao.nome == "") {

                console.log("sigla no traduzida " + sigla, origem)
                return sigla;

            }


            return comissao.nome;

        }
        $scope.hoje = new Date().getTime();
        $scope.proposicoes = [];
        var successCallback = function (data) {

            if (data.length == 0) {
                toaster.pop('info', 'Nenhuma Proposição encontrada.');
                return;
            }

            $scope.proposicoes = data;
        };
        var errorCallback = function () {
            toaster.pop('error', 'Falha ao consultar Proposição.');
            $rootScope.inactivateSpinner = false;
        };
        $scope.selecionaTipo = function (tipo) {
            switch (tipo) {
                case "Padrao_Despachos":
                    $rootScope.title = 'Ministério da Justiça e Cidadania';
                    ProposicaoResource.consultar(
                        {
                            estado: 'DESPACHADA',
                            limit: 200,
                            offset: 0
                        }, successCallback, errorCallback);
                    break;

                default:
                    break;
            }
        }
        $scope.printIt = function () { window.print(); };
        $scope.selecionaTipo(tipo);
        $scope.pautadas = function (isPautada) {
            return function (item, b) {
                if (isPautada && item.pautaComissaoAtual != null && item.pautaComissaoAtual.pautaReuniaoComissao != null && item.pautaComissaoAtual.pautaReuniaoComissao.data != null && item.pautaComissaoAtual.pautaReuniaoComissao.data >= $scope.hoje) {
                    return item;
                } else if (!isPautada && (item.pautaComissaoAtual == null || item.pautaComissaoAtual.pautaReuniaoComissao == null || item.pautaComissaoAtual.pautaReuniaoComissao.data == null || item.pautaComissaoAtual.pautaReuniaoComissao.data < $scope.hoje)) {
                    return item;
                } else {
                    return null;
                }

            };
        }

    });
