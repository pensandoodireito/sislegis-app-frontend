
var angular;
angular.module('sislegisapp')
    .controller('ProposicaoItemController', function ($scope, $window, $rootScope, $http, $filter, $routeParams, $location, $modal, $log, $timeout, toaster,
        ProposicaoResource, ComentarioResource, PosicionamentoResource, EquipeResource,
        EncaminhamentoProposicaoResource, ComentarioService, UsuarioResource,
        TipoEncaminhamentoResource, Auth, TagResource, $q,$sce, BACKEND) {

        $scope.getAuthorization = function () {
            return 'Bearer ' + Auth.authz.token;
        }
        $scope.getFormTemplateURL = function () {
            var back = BACKEND.substr(0, BACKEND.length - 5);
            return $sce.trustAsResourceUrl(back + "/template")
        }
      
        $scope.abrirModalParecerAreaMerito = function (item, revisao) {
            if (item.revisoes == null) {
                $scope.loadRevisoes(item);
            }
            var modalInstance = $modal.open({
                templateUrl: 'views/modal-parecer-areamerito.html',
                controller: 'ModalParecerAreaMeritoController',
                size: 'lg',
                resolve: {
                    proposicao: function () {
                        return item;
                    },
                    revisao: function () {
                        return revisao;
                    }
                }
            });

            modalInstance.result.then(function (listaNotas) {

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        $scope.loadRevisoes = function (item) {
            item.revisoes = ProposicaoResource.listaRevisoes({ ProposicaoId: item.id });
        }
        $scope.populaComentario = function (prop, callbackFct) {
            ComentarioResource.findByProposicao({ ProposicaoId: prop.id },
                function (lista) {
                    prop.listaComentario = lista;
                    if (callbackFct != null) {
                        callbackFct(prop);
                    }
                }
                );
        };
        $scope.abrirModalComentarios = function (item, cb) {

            if (cb != true && (item.listaComentario == null || item.listaComentario.length != item.totalComentarios)) {
                $scope.populaComentario(item, function (prop) {
                    $scope.abrirModalComentarios(prop, true);
                }
                    );
            } else {
                var modalInstance = $modal.open({
                    templateUrl: 'views/modal-comentarios.html',
                    controller: 'ModalComentariosController',
                    size: 'lg',
                    resolve: {
                        proposicao: function () {
                            return item;
                        }
                    }
                });

                modalInstance.result.then(function (listaComentario) {
                    item.listaComentario = listaComentario;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }
        };

        $scope.abrirModalNotaTecnica = function (item, tab) {

            var modalInstance = $modal.open({
                templateUrl: 'views/modal-documentos.html',
                controller: 'ModalNotaTecnicaController',
                size: 'lg',
                resolve: {
                    proposicao: function () {
                        return item;
                    },
                    tab: function () {
                        return tab;
                    }
                }
            });

            modalInstance.result.then(function (prop) {
                item = prop;
            }, function () {

            });
        }
        // }

        $scope.abrirModalEncaminhamentos = function (item, cb) {
            if (cb != true && item.listaEncaminhamentoProposicao == null || item.listaEncaminhamentoProposicao.length != item.totalEncaminhamentos) {

                item.listaEncaminhamentoProposicao = EncaminhamentoProposicaoResource.findByProposicao({ ProposicaoId: item.id });
            }

            var modalInstance = $modal.open({
                templateUrl: 'views/modal-encaminhamentos.html',
                controller: 'ModalEncaminhamentosController',
                size: 'lg',
                resolve: {
                    proposicao: function () {
                        return item;
                    }
                }
            });

            modalInstance.result.then(function (listaEncaminhamentos) {
                item.listaEncaminhamentoProposicao = listaEncaminhamentos;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }



        $scope.checkResponsavelNaoDefinido = function () {
            if ($scope.filtroResponsavelNaoDefinido) {
                $scope.filtroResponsavel = null;
            } else {
                $scope.filtroResponsavelNaoDefinido = "";
            }
        }

        $scope.checkPosicionamentoNaoDefido = function () {
            console.log("checkPosicionamentoNaoDefinido");
            if ($scope.filtroPosicionamentoNaoDefido) {
                $scope.filtroPosicionamento = null;
            } else {
                $scope.filtroPosicionamentoNaoDefido = "";
            }
        }

        $scope.checkUpdates = function (item) {
            $scope.checkingUpdated = true;
            ProposicaoResource.syncManually({}, {
                id: item.id
            }, function (data, b) {
                $scope.checkingUpdated = false;
                console.log("data", data, b);
                item = data;

            }, function (data) {
                $scope.checkingUpdated = false;
                if (data.status == 304) {
                    toaster.pop('info', 'Nenhuma atualização detectada');
                }
            });
        }

        $scope.getUsuarios = function (val, buscaGeral) {
            var method = (buscaGeral) ? 'ldapSearch' : 'find';
            var params = { method: method, nome: val };
            return UsuarioResource.buscaPorUsuario(params, params, function (data) { }).$promise;

        };
        $scope.validaEquipeSaver = function (newValue, oldValue, scope) {
            if (!(oldValue === undefined)) {
                if (!newValue || newValue == "" || newValue.id == null) {
                    newValue = null;
                    if (!oldValue || oldValue == "" || oldValue.id == null) {
                        console.log("ignora alteracao equipe");
                        return;
                    }
                    $scope.proposicao.equipe = null;
                }
                $scope.scheduleSaveTimer(newValue, oldValue, scope);
            }
        }
        $scope.lastSaveTimer = null;
        $scope.scheduleSaveTimer = function (newValue, oldValue, scope) {
            // console.log(oldValue===undefined,oldValue===null, "was", oldValue, "is", newValue);
            if (!(oldValue === undefined)) {
                console.log("was", oldValue, "is", newValue);

                if ($scope.lastSaveTimer != null) {
                    $timeout.cancel($scope.lastSaveTimer);
                }
                var fct = function () {
                    $scope.save($scope.proposicao);
                }
                $scope.lastSaveTimer = $timeout(fct, 2500, true, newValue);
            }
        }
        $scope.$watch('proposicao.explicacao', $scope.scheduleSaveTimer, true);
        $scope.$watch('proposicao.posicionamento', $scope.scheduleSaveTimer, true);
        $scope.$watch('proposicao.efetividade', $scope.scheduleSaveTimer, true);
        $scope.$watch('proposicao.responsavel', $scope.scheduleSaveTimer, true);
        $scope.$watch('proposicao.posicionamentoSupar', $scope.scheduleSaveTimer, true);
        $scope.$watch('proposicao.posicionamentoAtual', $scope.scheduleSaveTimer, true);
        $scope.$watch('proposicao.parecerSAL', $scope.scheduleSaveTimer, true);
        $scope.$watch('proposicao.equipe', $scope.validaEquipeSaver, true);

        $scope.trataAlteracaoDeEstado = function (newValue, oldValue, scope) {

            if (oldValue !== undefined) {


                if ($scope.lastSaveTimer != null) {
                    $timeout.cancel($scope.lastSaveTimer);
                }
                switch (newValue) {
                    case "EMANALISE":
                        $scope.proposicao.foiEncaminhada = new Date().getTime();
                        break;
                    case "ANALISADA":
                        $scope.proposicao.foiAnalisada = new Date().getTime();
                        break;
                    case "ADESPACHAR":
                        $scope.proposicao.foiRevisada = new Date().getTime();
                        break;
                    case "DESPACHADA":
                        $scope.proposicao.foiDespachada = new Date().getTime();
                        break;

                    default:
                        break;
                }
                
                $scope.save($scope.proposicao, "Estado alterado", "Falhou ao alterar estado").then(function (data) {
                    console.log(data, $scope.estadoHandler);                
                    
                }, function () {


                    $scope.proposicao.estado = oldValue;

                });
            }

        };
        $scope.estadoHandler = $scope.$watch('proposicao.estado', $scope.trataAlteracaoDeEstado, true);

        $scope.getHTML = function (valor) {//TODO virar diretiva
            if (valor) {
                var a = $sce.trustAsHtml(valor.replace(/\n\r?/g, '<br />'));
                return a;
            } else {
                return "";
            }
        }
        $scope.getPosicionamentos = function (current) {
            var copy = $scope.posicionamentos.slice(0);
            if (current) {
                var item = new PosicionamentoResource();
                item.nome = current;
                copy.unshift(item);
            }
            return copy;
        };

        $scope.loadRevisoes = function (item) {
            item.revisoes = ProposicaoResource.listaRevisoes({ ProposicaoId: item.id });
        }
        $scope.loadTags = function (query) {
            return TagResource.buscarPorSufixo({ sufixo: query }).$promise;
        };
        $scope.validaEquipe = function (item) {
            if (!item.equipe || item.equipe.id == null) {
                item.equipe = null;
            }
        }
        $scope.validaPosicionamento = function (item, field) {
            if (field != null && item != null) {
                var p = item[field];
                if (p != null && p.id == null) {
                    item[field] = null;
                }
            }
        }

        $scope.save = function (item, msgSucesso, msgErro) {

            if ($scope.lastSaveTimer != null) {
                $timeout.cancel($scope.lastSaveTimer);
            }
            var deferred = $q.defer();
            $scope.validaPosicionamento(item, 'posicionamentoSupar');
            $scope.validaPosicionamento(item.posicionamentoAtual, 'posicionamento');
            $scope.validaEquipe(item);


            if (!msgSucesso) {
                msgSucesso = 'Proposição atualizada com sucesso.';
            }
            if (!msgErro) {
                msgErro = 'Falha salvar proposição.';
            }

            $rootScope.savingItem = item;
            $rootScope.inactivateSpinner = true;
            var successCallback = function () {
                $rootScope.inactivateSpinner = false;
                toaster.pop('success', msgSucesso);
                deferred.resolve(item);
            };
            var errorCallback = function () {
                $rootScope.inactivateSpinner = false;
                toaster.pop('error', msgErro);
                deferred.reject('Falha salvar proposição.');
            };
            ProposicaoResource.update({}, item, successCallback, errorCallback);
            return deferred.promise;
        };


        $scope.incluirComentario = function (item) {
            
            var comentario = new ComentarioResource();
            comentario.descricao = item.comentarioTmp;
            item.comentarioTmp = null;

            var successCallback = function (data, responseHeaders) {
                if (item.listaComentario == null) {
                    $scope.populaComentario(item, function (prop) {
                        item.listaComentario = prop.listaComentario;
                        item.totalComentarios=prop.listaComentario.length;
                        toaster.pop('success', 'Comentário inserido com sucesso.');
                    });
                } else {
                    item.listaComentario.push(data);
                    item.totalComentarios++;
                    toaster.pop('success', 'Comentário inserido com sucesso');
                }
            };
            var errorCallback = function () {
                toaster.pop('error', 'Falha ao realizar operação.');
            };

            ComentarioService.save(comentario, item.id).then(successCallback, errorCallback);
        };



        $scope.isFollowed = function (item) {

            for (var i = 0; i < $scope.proposicoesSeguidas.length; i++) {
                var proposicao = $scope.proposicoesSeguidas[i];
                if (item.id == proposicao.id) {
                    return true;
                }
            }
            return false;
        };
        $scope.followProposicao = function (item) {
            ProposicaoResource.followProposicao({}, {
                id: item.id
            }, function () {
                $scope.proposicoesSeguidas.push({
                    id: item.id
                });
            });

        };
        $scope.unfollowProposicao = function (item) {
            ProposicaoResource.unfollowProposicao({}, {
                id: item.id
            }, function () {
                for (var i = 0; i < $scope.proposicoesSeguidas.length; i++) {
                    var proposicao = $scope.proposicoesSeguidas[i];
                    console.log(item, proposicao)
                    if (item.id == proposicao.id) {
                        $scope.proposicoesSeguidas.splice(i, 1);

                        break;
                    }
                }
            });

        };


    })

    .controller('DashboardController', function ($scope, $rootScope, $http, $filter, $routeParams, $location, $log, $timeout, toaster,
        DashboardService, Auth, $q, TarefaResource, BACKEND) {
        $scope.Auth = Auth;

        $scope.update = function () {
            if (!window.o) {
                return;
            }
            var origem = "c";
            var data = "10102016"
            if (window.o) {
                origem = window.o;
            }
            if (window.s) {
                data = window.s;
            }
            var comissao ="";
            if(window.c){
                comissao="&c="+window.c;
            }
            $http.get(BACKEND + '/proposicaos/auto?o=' + origem + '&s=' + data+comissao);
        }
        $scope.go = function (url, p) {
            $location.path(url).search({ filter: p });;
        }
        $scope.tarefas = TarefaResource.buscarPorUsuario();
        $scope.PieData = [];
        $scope.initChart = function () {
            //#d2d6de
            var colorArray = ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc'];
            // Get context with jQuery - using jQuery's .get() method.
            var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
            var pieChart = new Chart(pieChartCanvas);

            for (var index = 0; index < $scope.info.equipes.length; index++) {
                var equipe = $scope.info.equipes[index];
                $scope.PieData.push({
                    value: equipe.totalEmAnalise + equipe.totalProcessada,
                    color: colorArray[index],//"#f56954",
                    highlight: colorArray[index],
                    label: equipe.e.nome,
                    equipe: equipe
                });

            }
            $scope.PieData.push({
                value: $scope.info.semEquipe,
                color: "#d2d6de",
                highlight: "#d2d6de",
                label: "Sem Equipe",
                equipe: {e:{id:-1}}
            });



            var pieOptions = {
                //Boolean - Whether we should show a stroke on each segment
                segmentShowStroke: true,
                //String - The colour of each segment stroke
                segmentStrokeColor: "#fff",
                //Number - The width of each segment stroke
                segmentStrokeWidth: 1,
                //Number - The percentage of the chart that we cut out of the middle
                percentageInnerCutout: 20, // This is 0 for Pie charts
                //Number - Amount of animation steps
                animationSteps: 100,
                //String - Animation easing effect
                animationEasing: "easeOutBounce",
                //Boolean - Whether we animate the rotation of the Doughnut
                animateRotate: true,
                //Boolean - Whether we animate scaling the Doughnut from the centre
                animateScale: false,
                //Boolean - whether to make the chart responsive to window resizing
                responsive: true,
                // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
                maintainAspectRatio: false,
                //String - A legend template
                legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
                //String - A tooltip template
                tooltipTemplate: "<%=label%> <%=value %> analisados no mês"
            };
            //Create pie or douhnut chart
            // You can switch between pie and douhnut using the method below.
            pieChart.Doughnut($scope.PieData, pieOptions);
        }
        $scope.info = DashboardService.get($scope.initChart);

    })

    .controller(
        'ModalBuscaUnicaDeProposicaoController',
        function ($scope, $http, $filter, $routeParams, $location, toaster, $modalInstance, ProposicaoResource,
            listaProposicaoSelecao, BACKEND) {


            $scope.disabled = false;
            $scope.showDetalhamentoProposicao = false;
            $scope.$location = $location;

            $scope.campoData = new Date();

            $scope.comissao = new Object();
            $scope.listaProposicaoSelecao = [];
            $scope.listaProposicaoPesquisa = {};

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
                $scope.selectOrigemComissoes();
                $scope.habilitaAvulsa = true;
            };

            $scope.esconderAvulsa = function () {
                $scope.habilitaAvulsa = false;
                $scope.selectOrigemComissoes();
            };


            $scope.selectTipo = function () {
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
                            $scope.tipos = $scope.origens[1].tipos;
                            break;
                        case 'C':
                            url = BACKEND + '/comissaos/comissoesCamara';
                            $scope.tipos = $scope.origens[0].tipos;
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
            $scope.listaPautas = [];

            $scope.adicionarProposicao = function (proposicao, pauta) {
                if ($scope.listaProposicaoAvulsaSelecao.indexOf(proposicao) == -1) {
                    $scope.listaProposicaoAvulsaSelecao.push(proposicao);
                    $scope.listaPautas.push(pauta);
                }



            };

            $scope.removerProposicao = function (proposicao) {
                var index2 = $scope.listaProposicaoAvulsaSelecao.indexOf(proposicao);
                if (index2 != -1) {
                    $scope.listaProposicaoAvulsaSelecao.splice(index2, 1);
                    $scope.listaPautas.splice(index2, 1);
                }
            };

            $scope.salvar = function () {

                var successCallback = function () {
                    $modalInstance.close($scope.listaProposicaoSelecao);
                };
                var errorCallback = function () {
                    toaster.pop('info', '');
                };

                ProposicaoResource.salvarProposicoesGenericas({
                    pautas: $scope.listaPautas,
                    proposicoes: $scope.listaProposicaoAvulsaSelecao

                }, successCallback, errorCallback);
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

        })

    .controller('ConsultaProposicoesController', function ($scope, $rootScope, $http, $filter, $routeParams, $location, $modal, $log, $timeout, toaster,
        ProposicaoResource, ComentarioResource, PosicionamentoResource, EquipeResource,
        EncaminhamentoProposicaoResource, ComentarioService, UsuarioResource,
        TipoEncaminhamentoResource, Auth, TagResource, UploadService, $q, BACKEND, configConsulta, $sce,ComissaoService) {
        
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
        $scope.getAuthorization = function () {
            return 'Bearer ' + Auth.authz.token;
        }
        
        $scope.getReportURL = function () {
            var back = BACKEND.substr(0, BACKEND.length - 5);
            return $sce.trustAsResourceUrl(back + "/relatorio");
        }
        $scope.getSunday = function () {
            var d = new Date();
            d.setDate(d.getDate() - d.getDay())
            return d;
        }
        console.log("RouteParams", $routeParams);
        $scope.filtro = new ProposicaoResource();
        if ($routeParams.filter) {
            console.log("parametro filtro ativo", $routeParams.filter);
            $scope.filtro.sigla = $routeParams.filter.sigla;
            $scope.filtro.equipe = $routeParams.filter.equipe;
            $scope.filtro.estado = $routeParams.filter.estado;
            $scope.filtro.responsavel = $routeParams.filter.responsavel;
        } else {
            console.log(" nenhum parametro filtro ativo");
        }
        $scope.configConsulta = configConsulta;
        if (configConsulta) {
            if (configConsulta.filtro) {
                console.log("pre filtro ativo", configConsulta.filtro);
                $scope.filtro.estado = configConsulta.filtro.estado;
            }
        } else {
            console.log(" nenhum pre filtro ativo");
        }
        $scope.filtrosCol = false;
        try {
             
            //por alguma razao só funcionou via jquery           
            var fct1 = function () {
                $scope.filtroExpandido = true ;                
            };
            var fct2 = function () {
                $scope.filtroExpandido = false ;                
            };
            
            $('#collapseFullFilters').on('shown.bs.collapse',function(){
                $('#expandido').css('display','none');
                $('#colapsado').css('display','block');
            });
            $('#collapseFullFilters').on('hidden.bs.collapse', function(){
                $('#expandido').css('display','block');
                $('#colapsado').css('display','none');
            });
        } catch (e) {
            console.log(e)
        }

        $scope.proposicoes = [];
        $scope.Auth = Auth;
        $scope.posicionamentos = PosicionamentoResource.queryAll();

        $scope.macrotemas = TagResource.listarTodos();
        
        $scope.getRelatores = function(val){
             return ProposicaoResource.buscaRelator({ nome: val }, { nome: val },
                function (data) { 
                    
                        $scope.relatores=data;
                   
                    
                },
                function (error) { 
                toaster.pop('error', 'Falha ao buscar relatores'); }
                ).$promise;
        }
        $scope.getAutores  = function (val){
              return ProposicaoResource.buscaAutor({ nome: val }, { nome: val },
                function (data) { 
                    
                        $scope.autores=data;
                   
                    
                },
                function (error) { 
                toaster.pop('error', 'Falha ao buscar autores'); }
                ).$promise;
               
        }
        $scope.getUsuarios = function (val, buscaGeral) {
            var method = (buscaGeral) ? 'ldapSearch' : 'find';
            return UsuarioResource.buscaPorUsuario({ method: method, nome: val }, { method: method, nome: val },
                function (data) { 
                 data.push({id:-1,nome:"Sem responsável associado"});   
                },
                function (error) { t
                toaster.pop('error', 'Falha ao buscar usuários'); }
                ).$promise;

        };
        
        $scope.posicionamentoFiltro = [{ id: -1, nome: "Sem posicionamento definido" }];
         PosicionamentoResource.query({},function(data){
            $scope.posicionamentoFiltro=$scope.posicionamentoFiltro.concat(data);
         });
         $scope.comissoes=[];
        
         $scope.updateComissoes = function () {
             var origemSelecionada = $scope.filtro.origem;
             $scope.filtro.comissao=null;
             switch (origemSelecionada) {
                 case 'SENADO':
                     $scope.comissoes = ComissaoService.getComissoesSenado();
                     return;

                 case 'CAMARA':
                     $scope.comissoes = ComissaoService.getComissoesCamara();
                     return;
                 default:
                 
                     $scope.comissoes = [];
                     return;

             }
         }
         
         
        $scope.buscarProposicoes = function () {
            toaster.clear();

            var modalInstance = $modal.open({
                templateUrl: 'views/Proposicao/modal-busca-unica-proposicao.html',
                controller: 'ModalBuscaUnicaDeProposicaoController',
                size: 'lg',
                resolve: {
                    reuniao: function () {
                        return null;
                    },

                    reuniaoProposicao: function () {
                        return null;
                    },
                    listaProposicaoSelecao: function () {
                        return [];
                    }
                }
            });

            modalInstance.result.then(function (listaProposicaoSelecao) {
                if (listaProposicaoSelecao.length > 0) {
                    for (var index = 0; index < listaProposicaoSelecao.length; index++) {
                        var element = listaProposicaoSelecao[index];
                        $scope.proposicoes.push(element)
                    }

                }
            }, function () {
                // $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.proposicoesSeguidas = [];
        UsuarioResource.proposicoesSeguidas({}, function (data) {
            $scope.proposicoesSeguidas = data;
        }, function (data) {
            console.log("erro ao carregar proposicoes seguida", data);
        });


        $scope.infiniteScroll = {
            busy: false,
            limit: 20,
            offset: 0,
            full: false
        };

        $scope.equipesFiltro = [{ id: -1, nome: "Sem Equipe Associada" }];
        $scope.equipes = [];
        EquipeResource.queryAll(function (data) {
            for (var index = 0; index < data.length; index++) {
                var element = data[index];
                if (element.nome != "ASPAR") {
                    $scope.equipes.push(element);
                    $scope.equipesFiltro.push(element);
                }

            }
        });
        $scope.desmarcarAtencaoEspecial=function(item){
            $rootScope.savingItem = item;
             $rootScope.inactivateSpinner = true;
            
                
            ProposicaoResource.removerAtencaoEspecial({id:item.id},function(){
                $rootScope.inactivateSpinner = false;
                item.comAtencaoEspecial=null;
            }, function(){
                $rootScope.inactivateSpinner = false;
                toaster.pop('error', 'Falha ao alterar o status da proposicao'); 
            });
        }
        $scope.marcarAtencaoEspecial = function(item){
             var modalInstance = $modal.open({
                templateUrl: 'views/modal-encaminhamento-despacho-ministro.html',
                controller: 'ModalEncaminhamentoDespachoMinistroController',
                size: 'md',
                resolve: {
                    proposicao: function () {
                        return item;
                    }
                }
            });

            modalInstance.result.then(function () {                
                item.listaEncaminhamentoProposicao = EncaminhamentoProposicaoResource.findByProposicao({ ProposicaoId: item.id });
                item.comAtencaoEspecial=1;
            }, function () {
            });
        }
        $scope.despachoPresencial = function (item) {

            var modalInstance = $modal.open({
                templateUrl: 'views/modal-encaminhamento-despacho.html',
                controller: 'ModalEncaminhamentoDespachoController',
                size: 'md',
                resolve: {
                    proposicao: function () {
                        return item;
                    }
                }
            });

            modalInstance.result.then(function (novoEncaminhamento) {
                item.estado = 'ADESPACHAR_PRESENCA';
                item.listaEncaminhamentoProposicao = EncaminhamentoProposicaoResource.findByProposicao({ ProposicaoId: item.id });
            }, function () {
            });

        }

        $scope.setaEstado = function (item, estado) {
            var oldState = item.estado;
            item.estado = estado;
        }

        $scope.$watch('filtro', function (newValue, oldValue, scope) {
            if(newValue.relator!=oldValue.relator && newValue.relator!=null && newValue.relator!='' && newValue.relator.length<4 ){
                console.log("evitando watch por relator")
                return;
            }
            if(newValue.autor!=oldValue.autor && newValue.autor!=null && newValue.autor!='' && newValue.autor.length<4 ){
                console.log("evitando watch por autor")
                return;
            }
            console.log("Limpou proposicoes");
            $scope.proposicoes = [];
            
            $scope.infiniteScroll.busy = false;
            $scope.infiniteScroll.offset = 0;
            $scope.infiniteScroll.full = false;
            $scope.consultarProposicoes();
        }, true);
        $scope.today = new Date().getTime();

        $scope.consultarProposicoes = function () {

            if ($scope.infiniteScroll.busy || $scope.infiniteScroll.full) return;

            $scope.infiniteScroll.busy = true;
            $rootScope.inactivateSpinner = true;

            var successCallback = function (data) {
                $rootScope.inactivateSpinner = false;
                $scope.infiniteScroll.busy = false;
                if (data.length == 0) {
                    $scope.infiniteScroll.full = true;
                    return;
                };
               
                $scope.proposicoes = $scope.proposicoes.concat(data);

                if ($scope.proposicoes.length == 0) {
                    toaster.pop('info', 'Nenhuma Proposição encontrada.');
                    return;
                }
                $scope.infiniteScroll.offset += $scope.infiniteScroll.limit;


            };
            var errorCallback = function () {
                toaster.pop('error', 'Falha ao consultar Proposição.');
                $rootScope.inactivateSpinner = false;
                $scope.infiniteScroll.busy = false;
            };
            var getDateStr=function(data){
                if($scope.filtro.inseridaApos==null){
                    return null;
                }
                var d = $scope.filtro.inseridaApos;
                return d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear();
            }
            var filtroAtual =
                {
                    sigla: $scope.filtro.sigla,
                    ementa: $scope.filtro.ementa,
                    autor: $scope.filtro.autor,
                    relator: $scope.filtro.relator,
                    origem: $scope.filtro.origem,
                    isFavorita: $scope.filtro.isFavorita,
                    estado: $scope.filtro.estado,
                    inseridaApos: getDateStr(),
                    comAtencaoEspecial:$scope.filtro.comAtencaoEspecial,
                    comissao: $scope.filtro.comissao?$scope.filtro.comissao.sigla.trim():null,
                    macrotema: $scope.filtro.macrotema ? $scope.filtro.macrotema.tag : null,
                    idEquipe: $scope.filtro.equipe ? $scope.filtro.equipe.id : null,
                    idPosicionamento: $scope.filtro.posicionamento ? $scope.filtro.posicionamento.id : null,
                    idResponsavel: $scope.filtro.responsavel ? $scope.filtro.responsavel.id : null,
                    somentePautadas: $scope.filtro.somentePautadas,
                    limit: $scope.infiniteScroll.limit,
                    offset: $scope.infiniteScroll.offset
                };
            ProposicaoResource.consultar(
                filtroAtual, successCallback, errorCallback);
        }

    })
//     .factory('$exceptionHandler', function() {
//     return function(exception, cause) {
//     console.log("opa",exception,cause);
//     }
//   })
    .controller('SearchAreaMeritoController', function ($scope, $http, AreaMeritoResource) {

        $scope.search = {};
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.searchResults = [];
        $scope.filteredResults = [];
        $scope.pageRange = [];
        $scope.numberOfPages = function () {
            var result = Math.ceil($scope.filteredResults.length / $scope.pageSize);
            var max = (result == 0) ? 1 : result;
            $scope.pageRange = [];
            for (var ctr = 0; ctr < max; ctr++) {
                $scope.pageRange.push(ctr);
            }
            return max;
        };

        $scope.performSearch = function () {
            $scope.searchResults = AreaMeritoResource.query(function () {
                $scope.numberOfPages();
            });
        };

        $scope.previous = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };

        $scope.next = function () {
            if ($scope.currentPage < ($scope.numberOfPages() - 1)) {
                $scope.currentPage++;
            }
        };

        $scope.setPage = function (n) {
            $scope.currentPage = n;
        };

        $scope.performSearch();
    }).controller('EditAreaMeritoController', function ($scope, $routeParams, $location, locationParser, AreaMeritoResource, BACKEND, UsuarioResource, toaster, $confirm) {
        var self = this;
        $scope.disabled = false;
        $scope.$location = $location;
        $scope.getUsuarios = function (val, buscaGeral) {
            var method = (buscaGeral) ? 'ldapSearch' : 'find';
            return UsuarioResource.buscaPorUsuario({ method: method, nome: val }, { method: method, nome: val },
                function (data) { },
                function (error) { toaster.pop('error', 'Falha ao buscar por contatos'); }).$promise;

        };
        $scope.isNew = false;
        $scope.get = function () {
            var successCallback = function (data) {
                self.original = data;
                $scope.area = new AreaMeritoResource(self.original);
            };
            var errorCallback = function () {
                $location.path("/AreaDeMerito");
            };
            if ($routeParams.id == null) {
                $scope.isNew = true;
            } else {
                AreaMeritoResource.get({ id: $routeParams.id }, successCallback, errorCallback);
            }
        };

        $scope.isClean = function () {
            return angular.equals(self.original, $scope.area);
        };

        $scope.save = function () {

            var successCallback = function (data, responseHeaders) {
                if ($scope.isNew) {
                    var id = locationParser(responseHeaders);
                    $location.path('/AreaDeMerito/edit/' + id);
                } else {
                    $scope.get();
                    $scope.displayError = false;
                }
            };
            var errorCallback = function () {
                $scope.displayError = true;
            };
            if ($scope.isNew) {
                $scope.area = new AreaMeritoResource($scope.area);
                $scope.area.$save(successCallback, errorCallback);
                // AreaMeritoResource.save($scope.area, successCallback, errorCallback);
            } else {
                $scope.area.$save(successCallback, errorCallback);
            }
        };

        $scope.cancel = function () {
            $location.path("/AreaDeMerito");
        };

        $scope.remove = function () {

            var successCallback = function () {
                $location.path("/AreaDeMerito");
                $scope.displayError = false;
            };
            var errorCallback = function () {
                $scope.displayError = true;
            };
            var removeIt = function () {
                $scope.area.$remove(successCallback, errorCallback);
            }
            $confirm({ text: 'Deseja realmente apagar essa área externa? Qualquer parecer associado a ela será apagado.', title: 'Apagar área', ok: 'Sim', cancel: 'Não' })
                .then(removeIt);
        };


        $scope.get();
    }).controller('ModalNotaTecnicaController',
        function ($scope, $http, $filter, $routeParams, $location, toaster, $modalInstance, proposicao, tab, ComentarioResource,
            ProposicaoResource, UsuarioResource, ComentarioService, UploadService, $confirm, BACKEND, $sce, Auth) {

            if(tab!=null){
                $scope.currTab=tab;
            }else{
                $scope.currTab='nota';
            }


            var self = this;
            $scope.getAuthorization = function () {
                return 'Bearer ' + Auth.authz.token;
            }
            $scope.getFormURL = function () {
                var back = BACKEND.substr(0, BACKEND.length - 5);
                return $sce.trustAsResourceUrl(back + "/documentos")
            }

            $scope.proposicao = proposicao || new ProposicaoResource();
            proposicao.listaNotas = ProposicaoResource.listNotaTecnicas({ ProposicaoId: proposicao.id });
            proposicao.listaBriefings = ProposicaoResource.listDocRelated({ ProposicaoId: proposicao.id, type: 2 });
            proposicao.listaEmendas = ProposicaoResource.listDocRelated({ ProposicaoId: proposicao.id, type: 3 });

            $scope.notaForm = false;
            $scope.showNotaForm = function (b) {
                $scope.notaForm = b
            }

            $scope.novaNota = function () {
                $scope.notaForm = true;
            };
            $scope.ok = function () {
                $modalInstance.close($scope.proposicao);
            };

            $scope.cancel = function () {
                if ($scope.notaForm == true) {
                    $scope.notaForm = false;
                } else {
                    $modalInstance.dismiss('cancel');
                }
            };
            $scope.removeDoc = function (notaARemover) {
                var type = 1; var arr = $scope.proposicao.listaNotas;
                switch ($scope.currTab) {
                    case 'nota': type = 1; arr = $scope.proposicao.listaNotas; break;
                    case 'brief': type = 2; arr = $scope.proposicao.listaBriefings; break;
                    case 'emenda': type = 3; arr = $scope.proposicao.listaEmendas; break;
                    default: throw ("Nao achou o tipo de documento");
                }
                var successCallback = function (data, responseHeaders) {

                    for (var index = 0; index < arr.length; index++) {
                        var element = arr[index];
                        if (element.id == notaARemover.id) {
                            arr.splice(index, 1);
                            break;
                        }
                    }
                    switch (type) {
                        case 1: $scope.proposicao.totalNotasTecnicas = arr.length; break;
                        case 2: $scope.proposicao.totalBriefings = arr.length; break;
                        case 3: $scope.proposicao.totalEmendas = arr.length; break;
                        default: throw ("Nao achou o tipo de documento");
                    }
                    toaster.pop('success', 'Documento removido com sucesso');
                    $scope.notaForm = false;
                };

                var errorCallback = function () {
                    toaster.pop('error', 'Falha ao tentar remove documento.');
                };

                var removeIt = function () {
                    ProposicaoResource.removeDoc({ ProposicaoId: $scope.proposicao.id, docId: notaARemover.id, type: type }, successCallback, errorCallback);
                }

                $confirm({ text: 'Deseja realmente apagar esse documento.', title: 'Apagar documento', ok: 'Sim', cancel: 'Não' })
                    .then(removeIt);

            }

            $scope.uploadfile = function (actionUrl) {
                var type = 1; var arr = $scope.proposicao.listaNotas;
                switch ($scope.currTab) {
                    case 'nota': type = 1; arr = $scope.proposicao.listaNotas; break;
                    case 'brief': type = 2; arr = $scope.proposicao.listaBriefings; break;
                    case 'emenda': type = 3; arr = $scope.proposicao.listaEmendas; break;
                    default: throw ("Nao achou o tipo de documento");
                }
                var successCallback = function (data, responseHeaders) {
                    $scope.uploading = false;
                    var found = false;

                    for (var index = 0; index < arr.length; index++) {
                        var element = arr[index];

                        if (element.id == data.id) {
                            element = data;
                            found = true;
                            break;
                        }

                    }
                    if (!found) {
                        arr.push(data);
                    }
                    switch (type) {
                        case 1: $scope.proposicao.totalNotasTecnicas = arr.length; break;
                        case 2: $scope.proposicao.totalBriefings = arr.length; break;
                        case 3: $scope.proposicao.totalEmendas = arr.length; break;
                        default: throw ("Nao achou o tipo de documento");
                    }

                    toaster.pop('success', 'Documento inserido com sucesso');
                    $scope.notaForm = false;
                };

                var errorCallback = function () {
                    $scope.uploading = false;
                    toaster.pop('error', 'Falha ao tentar salvar documento.');
                };
                var file = $scope.myFile;
                $scope.uploading = true;
                UploadService('documentos', file, { type: type, idProposicao: $scope.proposicao.id }).then(successCallback, errorCallback);
            };



        }).controller('ModalParecerAreaMeritoController',
            function ($scope, $http, $filter, $routeParams, $location, toaster, $modalInstance, proposicao, ComentarioResource,
                ProposicaoResource, UsuarioResource, ComentarioService, PosicionamentoResource, UploadService, AreaMeritoResource, revisao, Auth, BACKEND, $sce) {
                $scope.getAuthorization = function () {
                    return 'Bearer ' + Auth.authz.token;
                }
                $scope.getFormURL = function () {
                    var back = BACKEND.substr(0, BACKEND.length - 5);
                    return $sce.trustAsResourceUrl(back + "/documentos")
                }
                $scope.areas = AreaMeritoResource.query();

                $scope.removeAnexo = function () {
                    var successCallback = function (data, responseHeaders) {

                        $scope.revisao.documento = null;
                        toaster.pop('success', 'Anexo removido');

                    };

                    var errorCallback = function () {

                        toaster.pop('error', 'Falha ao remover documento.');
                    };
                    ProposicaoResource.removeAnexoRevisao({ ProposicaoId: $scope.revisao.proposicao.id, RevisaoId: $scope.revisao.id }, $scope.revisao, successCallback, errorCallback);
                }
                $scope.remove = function () {
                    var successCallback = function (data, responseHeaders) {
                        var indexOf = proposicao.revisoes.indexOf($scope.revisao);
                        if (indexOf != -1) {
                            proposicao.revisoes.splice(indexOf, 1);
                        }
                        toaster.pop('success', 'Revisão removida');
                        $modalInstance.dismiss('cancel');

                    };

                    var errorCallback = function () {

                        toaster.pop('error', 'Falha ao remover revisão.');
                    };
                    ProposicaoResource.removeRevisao({ ProposicaoId: $scope.revisao.proposicao.id, RevisaoId: $scope.revisao.id }, $scope.revisao, successCallback, errorCallback);
                }

                $scope.revisao = {
                    proposicao: {
                        id: proposicao.id
                    }
                }
                if (revisao != null) {
                    $scope.revisao = revisao;
                }

                $scope.posicionamentos = PosicionamentoResource.query();


                $scope.uploadfile = function (actionUrl) {

                    var successCallback = function (data, responseHeaders) {
                        $scope.uploading = false;

                        $scope.revisao.documento = data.documento;
                        console.log($scope.revisao);
                        toaster.pop('success', 'Parecer inserido com sucesso');

                    };

                    var errorCallback = function () {
                        $scope.uploading = false;
                        toaster.pop('error', 'Falha ao tentar anexar documento, mas parecer de area foi salvo.');
                    };

                    var file = $scope.myFile;
                    console.log(file)
                    $scope.uploading = true;
                    UploadService('documentos', file, { type: 4, idRevisao: $scope.revisao.id }).then(successCallback, errorCallback);
                };


                $scope.cancel = function () {


                    $modalInstance.dismiss('cancel');

                };
                $scope.save = function () {

                    var successCallback = function (data, responseHeaders) {

                        if (proposicao.revisoes == null) {
                            proposicao.revisoes = [];
                        }
                        $scope.revisao.id = data.id;
                        proposicao.revisoes.push(data);
                        $scope.revisao = data;
                        proposicao.totalParecerAreaMerito = proposicao.revisoes.length;
                        var file = $scope.myFile;
                        console.log("File", file)
                        if (file != null) {
                            $scope.uploadfile();
                        } else {
                            toaster.pop('success', 'Parecer inserido com sucesso');
                        }
                        // $modalInstance.close($scope.revisao.proposicao);
                    };

                    var errorCallback = function () {
                        toaster.pop('error', 'Falha ao tentar salvar parecer.');
                    };

                    ProposicaoResource.salvarRevisao({ ProposicaoId: $scope.revisao.proposicao.id }, $scope.revisao, successCallback, errorCallback);
                };


            }).controller('ModalComentariosController',
                function ($scope, $http, $filter, $sce,$routeParams, $location, toaster, $modalInstance, proposicao, ComentarioResource,
                    ProposicaoResource, UsuarioResource, ComentarioService,Auth,$confirm) {
                    $scope.auth = Auth;
                    var self = this;
                   
                    $scope.getHTML=function(valor){//TODO virar diretiva
                                var a= $sce.trustAsHtml(valor.replace(/\n\r?/g, '<br />'));
                                return a;
                            }
                    $scope.proposicao = proposicao || new ProposicaoResource();
                    $scope.comentario = $scope.comentario || new ComentarioResource();
                    $scope.canUpdate=function(comentario){
                        
                        return $scope.auth.isAdmin() || comentario.autor.email==$scope.auth.me.email;
                    }
                    $scope.ok = function () {
                        $modalInstance.close($scope.proposicao.listaComentario);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.isClean = function () {
                        return angular.equals(self.original, $scope.comentario);
                    };

                    $scope.openUpdate = function (item) {
                        $scope.comentario = item;
                    };
                    $scope.remove = function (item) {
                        var removeIt = function () {
                            ComentarioResource.remove({ ComentarioId: item.id }, function () {
                                var index = $scope.proposicao.listaComentario.indexOf(item);
                                if (index > -1) {
                                    $scope.proposicao.listaComentario.splice(index, 1);
                                    $scope.proposicao.totalComentarios--;
                                }
                            },
                                function (error) {
                                    toaster.pop('error', 'Falha ao realizar operação.');
                                });
                        }
                        $confirm({ text: 'Deseja realmente apagar esse comentário?', title: 'Apagar comentário', ok: 'Sim', cancel: 'Não' })
                            .then(removeIt);

                    }
                    $scope.update = function () {
                        var successCallback = function () {
                            $scope.comentario = new ComentarioResource();
                            toaster.pop('success', 'Comentário atualizado com sucesso');
                        };
                        var errorCallback = function (erro) {
                            if (erro && erro.status == 403) {
                                toaster.pop('error', 'Você não tem permissão para alterar esse comentário.');
                            } else {
                                toaster.pop('error', 'Falha ao realizar operação.');
                            }
                        };
                        console.log($scope.comentario)
                        $scope.comentario.proposicao = { id: $scope.comentario.proposicao.id }
                        ComentarioResource.update($scope.comentario, successCallback, errorCallback);
                    };


                    $scope.save = function () {
                        var successCallback = function (data, responseHeaders) {
                            $scope.proposicao.listaComentario.push(data);
                            $scope.comentario = new ComentarioResource();
                            $scope.proposicao.totalComentarios++;
                            toaster.pop('success', 'Comentário inserido com sucesso');
                        };

                        var errorCallback = function () {
                            toaster.pop('error', 'Falha ao realizar operação.');
                        };

                        ComentarioService.save($scope.comentario, $scope.proposicao.id).then(successCallback, errorCallback);
                    };

                    $scope.ocultar = function (item) {
                        var successCallback = function () {
                            toaster.pop('success', 'Comentário oculto com sucesso');
                        };
                        var errorCallback = function () {
                            toaster.pop('error', 'Falha ao realizar operação.');
                        }

                        ComentarioResource.ocultar({ idComentario: item.id }, successCallback, errorCallback);
                        var index = $scope.proposicao.listaComentario.indexOf(item);
                        $scope.proposicao.listaComentario.splice(index, 1);
                        $scope.proposicao.totalComentarios--;

                    }

                }).controller('EditTagController', function ($scope, $routeParams, $location, TagResource, locationParser, $confirm) {
                    var self = this;
                    $scope.disabled = false;
                    $scope.$location = $location;
                    $scope.isNew = false;
                    $scope.get = function () {
                        var successCallback = function (data) {
                            self.original = data;
                            $scope.tag = new TagResource(self.original);
                        };
                        var errorCallback = function () {
                            $location.path("/Tags");
                        };
                        if ($routeParams.id == null) {
                            $scope.isNew = true;
                        } else {
                            TagResource.get({ TagId: $routeParams.id }, successCallback, errorCallback);
                        }
                    };

                    $scope.isClean = function () {
                        return angular.equals(self.original, $scope.tag);
                    };

                    $scope.save = function () {

                        var successCallback = function (data, responseHeaders) {
                            if ($scope.isNew) {
                                var id = locationParser(responseHeaders);
                                $location.path('/Tags/edit/' + id);
                            } else {
                                $scope.get();
                                $scope.displayError = false;
                            }
                        };
                        var errorCallback = function () {
                            $scope.displayError = true;
                        };
                        if ($scope.isNew) {
                            $scope.tag = new TagResource($scope.tag);
                            $scope.tag.$save(successCallback, errorCallback);
                            // AreaMeritoResource.save($scope.tag, successCallback, errorCallback);
                        } else {
                            TagResource.update({ TagId: $routeParams.id }, $scope.tag, successCallback, errorCallback);
                        }
                    };

                    $scope.cancel = function () {
                        $location.path("/Tags");
                    };

                    $scope.remove = function () {

                        var successCallback = function () {
                            $location.path("/Tags");
                            $scope.displayError = false;
                        };
                        var errorCallback = function () {
                            $scope.displayError = true;
                        };
                        var removeIt = function () {
                            TagResource.remove({ TagId: $routeParams.id }, successCallback, errorCallback);
                        }
                        $confirm({ text: 'Deseja realmente apagar essa palavra chave? Qualquer proposicao  associado a ela será apagado.', title: 'Apagar palavra chave', ok: 'Sim', cancel: 'Não' })
                            .then(removeIt);
                    };


                    $scope.get();
                }).controller('SearchTagController', function ($scope, $http, TagResource) {

                    $scope.search = {};
                    $scope.currentPage = 0;
                    $scope.pageSize = 10;
                    $scope.searchResults = [];
                    $scope.filteredResults = [];
                    $scope.pageRange = [];
                    $scope.numberOfPages = function () {
                        var result = Math.ceil($scope.filteredResults.length / $scope.pageSize);
                        var max = (result == 0) ? 1 : result;
                        $scope.pageRange = [];
                        for (var ctr = 0; ctr < max; ctr++) {
                            $scope.pageRange.push(ctr);
                        }
                        return max;
                    };

                    $scope.performSearch = function () {
                        $scope.searchResults = TagResource.listarTodos(function () {
                            $scope.numberOfPages();
                        });
                    };

                    $scope.previous = function () {
                        if ($scope.currentPage > 0) {
                            $scope.currentPage--;
                        }
                    };

                    $scope.next = function () {
                        if ($scope.currentPage < ($scope.numberOfPages() - 1)) {
                            $scope.currentPage++;
                        }
                    };

                    $scope.setPage = function (n) {
                        $scope.currentPage = n;
                    };

                    $scope.performSearch();
                }).controller(
                    'ModalEncaminhamentoDespachoMinistroController',
                    function ($scope, $rootScope, $http, $filter, $routeParams, $location, $modalInstance, toaster, proposicao,
                        TipoEncaminhamentoResource, ProposicaoResource, EncaminhamentoProposicaoResource, EncaminhamentoProposicaoHttp, UsuarioResource,
                        ComentarioResource, BACKEND, $confirm) {

                        var self = this;
                        $scope.disabled = false;
                        $scope.$location = $location;

                        $scope.proposicao = proposicao || new ProposicaoResource();
                        $scope.tipoEncaminhamento = new TipoEncaminhamentoResource();
                        $scope.encaminhamentoProposicao = new EncaminhamentoProposicaoResource();
                                               
                       
                        $scope.ok = function () {
                            $modalInstance.close($scope.proposicao.listaEncaminhamentoProposicao);
                        };

                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };

                        $scope.isClean = function () {
                            return angular.equals(self.original, $scope.encaminhamentoProposicao);
                        };

                        $scope.save = function () {

                            $scope.encaminhamentoProposicao.proposicao = new ProposicaoResource();
                            $scope.encaminhamentoProposicao.proposicao.id = $scope.proposicao.id;
                            if ($scope.encaminhamentoProposicao.dataHoraLimite != null) {
                                $scope.encaminhamentoProposicao.dataHoraLimite = $scope.encaminhamentoProposicao.dataHoraLimite
                                    .getTime();
                            }

                            var successCallback = function (data, responseHeaders) {
                                $modalInstance.close($scope.encaminhamentoProposicao);

                                toaster.pop('success', 'Marcada para atenção especial');

                            };
                            var errorCallback = function () {
                                toaster.pop('error', 'Falha ao realizar operação.');
                            };
                            EncaminhamentoProposicaoResource.saveAtencaoEspecial($scope.encaminhamentoProposicao, successCallback, errorCallback);
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

                    }).controller(
                    'ModalEncaminhamentoDespachoController',
                    function ($scope, $rootScope, $http, $filter, $routeParams, $location, $modalInstance, toaster, proposicao,
                        TipoEncaminhamentoResource, ProposicaoResource, EncaminhamentoProposicaoResource, EncaminhamentoProposicaoHttp, UsuarioResource,
                        ComentarioResource, BACKEND, $confirm) {

                        var self = this;
                        $scope.disabled = false;
                        $scope.$location = $location;

                        $scope.proposicao = proposicao || new ProposicaoResource();
                        $scope.tipoEncaminhamento = new TipoEncaminhamentoResource();
                        $scope.encaminhamentoProposicao = new EncaminhamentoProposicaoResource();
                        $scope.encaminhamentoProposicao.responsavel = proposicao.responsavel;
                        $scope.listaEncaminhamento = TipoEncaminhamentoResource.queryAll() || [];

                        $scope.getUsuarios = function (val) {
                            return $http.get(BACKEND + '/usuarios/find', {
                                params: {
                                    nome: val
                                }
                            }).then(function (response) {
                                return response.data.map(function (item) {
                                    return item;
                                });
                            });
                        };

                        $scope.ok = function () {
                            $modalInstance.close($scope.proposicao.listaEncaminhamentoProposicao);
                        };

                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };

                        $scope.isClean = function () {
                            return angular.equals(self.original, $scope.encaminhamentoProposicao);
                        };

                        $scope.save = function () {

                            $scope.encaminhamentoProposicao.proposicao = new ProposicaoResource();
                            $scope.encaminhamentoProposicao.proposicao.id = $scope.proposicao.id;
                            if ($scope.encaminhamentoProposicao.dataHoraLimite != null) {
                                $scope.encaminhamentoProposicao.dataHoraLimite = $scope.encaminhamentoProposicao.dataHoraLimite
                                    .getTime();
                            }

                            var successCallback = function (data, responseHeaders) {
                                $modalInstance.close($scope.encaminhamentoProposicao);

                                toaster.pop('success', 'Despacho presencial criado com sucesso');

                            };
                            var errorCallback = function () {
                                toaster.pop('error', 'Falha ao realizar operação.');
                            };
                            EncaminhamentoProposicaoResource.saveDespachoPresencial($scope.encaminhamentoProposicao, successCallback, errorCallback);
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

                    });