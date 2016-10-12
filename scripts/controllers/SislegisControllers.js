
var angular;
angular.module('sislegisapp')
    .controller('ProposicaoItemController', function ($scope, $window, $rootScope, $http, $filter, $routeParams, $location, $modal, $log, $timeout, toaster,
        ProposicaoResource, ComentarioResource, PosicionamentoResource, EquipeResource,
        EncaminhamentoProposicaoResource, ComentarioService, UsuarioResource,
        TipoEncaminhamentoResource, Auth, TagResource, $q, BACKEND) {


        $scope.baixarTemplate = function (item) {

            // http://localhost:8080/sislegis/rest/proposicaos/2047/templateBriefing
            var back = BACKEND.substr(0, BACKEND.length - 5);
            window.open(back + "/template?id=" + item.id);
        }
        $scope.abrirModalParecerAreaMerito = function (item, revisao) {
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
        $scope.populaNotas = function (prop, callbackFct) {
            ProposicaoResource.listNotaTecnicas({ ProposicaoId: prop.id }, function (lista) {
                prop.listaNotas = lista;
                if (callbackFct != null) {
                    callbackFct();
                }
            }
                );
        }
        $scope.abrirModalNotaTecnica = function (item, cb) {

            if (cb != true && item.listaNotas == null || item.listaNotas.length != item.totalNotasTecnicas) {
                $scope.populaNotas(item, function () { $scope.abrirModalNotaTecnica(item, true) });
            } else {


                var modalInstance = $modal.open({
                    templateUrl: 'views/modal-notatecnicas.html',
                    controller: 'ModalNotaTecnicaController',
                    size: 'lg',
                    resolve: {
                        proposicao: function () {
                            return item;
                        }
                    }
                });

                modalInstance.result.then(function (prop) {
                    item = prop;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }
        }

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
        $scope.lastSaveTimer = null;

        $scope.$watch('proposicao', function (newValue, oldValue, scope) {
            console.log("was", oldValue, "is", newValue);
            if (oldValue != null) {
                // if (oldValue.posicionamentoAtual != newValue.posicionamentoAtual) {
                //     console.log("alterou posicionameto");
                //     return;
                // }
                if (newValue.lastSaveTimer != null) {
                    $timeout.cancel(newValue.lastSaveTimer);
                }
                var fct = function () {
                    $scope.save($scope.proposicao);
                }
                newValue.lastSaveTimer = $timeout(fct, 2500, true, newValue);
            }
        }, true);
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


            if (!msgSucesso) {
                msgSucesso = 'Proposição atualizada com sucesso.';
            }
            if (!msgErro) {
                msgErro = 'Falha salvar proposição.';
            }


            // clear();

            $rootScope.inactivateSpinner = true;
            var successCallback = function () {
                $rootScope.inactivateSpinner = false;

                deferred.resolve(item);


                toaster.pop('success', msgSucesso);
            };
            var errorCallback = function () {
                $rootScope.inactivateSpinner = false;
                toaster.pop('error', msgErro);
                deferred.reject('Falha salvar proposição.');
            };
            ProposicaoResource.update(item, successCallback, errorCallback);
            return deferred.promise;
        };


        $scope.incluirComentario = function (item) {
            var comentario = new ComentarioResource();
            comentario.descricao = item.comentarioTmp;
            item.comentarioTmp = null;

            var successCallback = function (data, responseHeaders) {
                item.listaComentario.push(data);
                item.totalComentarios++;
                toaster.pop('success', 'Comentário inserido com sucesso');
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
                    value: equipe.totalEmAnalise + equipe.totalAnalisada,
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
                equipe: null
            });



            var pieOptions = {
                //Boolean - Whether we should show a stroke on each segment
                segmentShowStroke: true,
                //String - The colour of each segment stroke
                segmentStrokeColor: "#fff",
                //Number - The width of each segment stroke
                segmentStrokeWidth: 1,
                //Number - The percentage of the chart that we cut out of the middle
                percentageInnerCutout: 50, // This is 0 for Pie charts
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
                tooltipTemplate: "<%=value %> <%=label%>"
            };
            //Create pie or douhnut chart
            // You can switch between pie and douhnut using the method below.
            pieChart.Doughnut($scope.PieData, pieOptions);
        }
        $scope.info = DashboardService.get($scope.initChart);

    })
    .controller('DespachoController', function ($scope, $rootScope, $http, $filter, $routeParams, $location, $modal, $log, $timeout, toaster,
        ProposicaoResource, ComentarioResource, PosicionamentoResource, EquipeResource,
        EncaminhamentoProposicaoResource, ComentarioService, UsuarioResource,
        TipoEncaminhamentoResource, Auth, TagResource, UploadService, $q, BACKEND) {

        console.log("RouteParams", $routeParams)
        $scope.proposicoes = [];
        $scope.Auth = Auth;
        $scope.posicionamentos = PosicionamentoResource.queryAll();
        $scope.macrotemas = TagResource.listarTodos();
        $scope.filtro = new ProposicaoResource();


        $scope.proposicoesSeguidas = [];
        UsuarioResource.proposicoesSeguidas({}, function (data) {
            $scope.proposicoesSeguidas = data;
        }, function (data) {
            console.log("erro ao carregar proposicoes seguida", data);
        });


        $scope.infiniteScroll = {
            busy: false,
            limit: 10,
            offset: 0,
            full: false
        };

        $scope.equipes = [];
        EquipeResource.queryAll(function (data) {
            for (var index = 0; index < data.length; index++) {
                var element = data[index];
                if (element.nome != "ASPAR") {
                    $scope.equipes.push(element);
                }

            }
        });


        $scope.setaEstado = function (item, estado) {
            var oldState = item.estado;
            item.estado = estado;
            console.log(item.lastSaveTimer)
            $timeout.cancel(item.lastSaveTimer);
            ProposicaoResource.update(item, function () { }, function () { item.estado = oldState });
        }

        $scope.$watch('filtro', function (newValue, oldValue, scope) {
            $scope.proposicoes = [];
            $scope.infiniteScroll.busy = false;
            $scope.infiniteScroll.offset = 0;
            $scope.infiniteScroll.full = false;
            $scope.consultarProposicoes();
        }, true);

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

            ProposicaoResource.consultar(
                {
                    sigla: $scope.filtro.sigla,
                    ementa: $scope.filtro.ementa,
                    autor: $scope.filtro.autor,
                    origem: $scope.filtro.origem,
                    isFavorita: $scope.filtro.isFavorita,
                    estado: 'ADESPACHAR',
                    macrotema: $scope.filtro.macrotema ? $scope.filtro.macrotema.tag : null,
                    idEquipe: $scope.filtro.equipe ? $scope.filtro.equipe.id : null,
                    limit: $scope.infiniteScroll.limit,
                    offset: $scope.infiniteScroll.offset
                }, successCallback, errorCallback);
        }

    })
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
        function ($scope, $http, $filter, $routeParams, $location, toaster, $modalInstance, proposicao, ComentarioResource,
            ProposicaoResource, UsuarioResource, ComentarioService, UploadService, $confirm, BACKEND) {

            var self = this;

            $scope.proposicao = proposicao || new ProposicaoResource();



            $scope.nota = {

            };
            $scope.notaForm = false;
            $scope.showNotaForm = function (b) {
                $scope.notaForm = b
            }

            $scope.editNota = function (nota) {
                $scope.notaForm = true;
                $scope.nota = nota;

            };
            $scope.novaNota = function () {
                $scope.notaForm = true;
                $scope.nota = {

                };
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
            $scope.removeNota = function (notaARemover) {
                var successCallback = function (data, responseHeaders) {

                    for (var index = 0; index < $scope.proposicao.listaNotas.length; index++) {
                        var element = $scope.proposicao.listaNotas[index];
                        if (element.id == notaARemover.id) {
                            $scope.proposicao.listaNotas.splice(index, 1);
                            break;
                        }
                    }
                    $scope.proposicao.totalNotasTecnicas = $scope.proposicao.listaNotas.length;
                    toaster.pop('success', 'Nota removida com sucesso');
                    $scope.notaForm = false;
                };

                var errorCallback = function () {
                    toaster.pop('error', 'Falha ao tentar remove nota técnica.');
                };

                var removeIt = function () {
                    ProposicaoResource.removeNota({ ProposicaoId: $scope.proposicao.id, notaId: notaARemover.id }, successCallback, errorCallback);
                }

                $confirm({ text: 'Deseja realmente apagar essa nota técnica.', title: 'Apagar nota técnica', ok: 'Sim', cancel: 'Não' })
                    .then(removeIt);

            }
            // $scope.save = function () {


            //     ProposicaoResource.salvaNota({ ProposicaoId:  }, $scope.nota, successCallback, errorCallback);
            // };
            $scope.uploadfile = function (actionUrl) {
                var successCallback = function (data, responseHeaders) {
                    $scope.uploading = false;
                    var found = false;
                    for (var index = 0; index < $scope.proposicao.listaNotas.length; index++) {
                        var element = $scope.proposicao.listaNotas[index];

                        if (element.id == data.id) {
                            element = data;
                            found = true;
                            break;
                        }

                    }
                    if (!found) {
                        $scope.proposicao.listaNotas.push(data);
                    }
                    $scope.proposicao.totalNotasTecnicas = $scope.proposicao.listaNotas.length;
                    toaster.pop('success', 'Nota inserida com sucesso');
                    $scope.notaForm = false;
                };

                var errorCallback = function () {
                    $scope.uploading = false;
                    toaster.pop('error', 'Falha ao tentar salvar nota técnica.');
                };
                var file = $scope.myFile;
                console.log("file", file);
                $scope.uploading = true;
                UploadService('documentos', file, { type: 1, idProposicao: $scope.proposicao.id }).then(successCallback, errorCallback);
            };
            $scope.openFile = function (nota) {
                var back = BACKEND.substr(0, BACKEND.length - 5);

                window.open(back + "/documentos?id=" + nota.documento.id);
            }

        }).controller('ModalParecerAreaMeritoController',
            function ($scope, $http, $filter, $routeParams, $location, toaster, $modalInstance, proposicao, ComentarioResource,
                ProposicaoResource, UsuarioResource, ComentarioService, PosicionamentoResource, UploadService, revisao) {


                $scope.areaMeritos = ProposicaoResource.listaAreaMerito();
                $scope.revisao = {
                    proposicao: proposicao
                }
                if (revisao != null) {
                    $scope.revisao = revisao;
                }

                $scope.posicionamentos = PosicionamentoResource.query();





                $scope.cancel = function () {


                    $modalInstance.dismiss('cancel');

                };
                $scope.save = function () {
                    var successCallback = function (data, responseHeaders) {

                        if ($scope.revisao.proposicao.revisoes == null) {
                            $scope.revisao.proposicao.revisoes = [];
                        }
                        $scope.revisao.proposicao.revisoes.push(data);

                        toaster.pop('success', 'Parecer inserido com sucesso');
                        $modalInstance.close($scope.revisao.proposicao);
                    };

                    var errorCallback = function () {
                        toaster.pop('error', 'Falha ao tentar salvar parecer.');
                    };

                    ProposicaoResource.salvarRevisao({ ProposicaoId: $scope.revisao.proposicao.id }, $scope.revisao, successCallback, errorCallback);
                };


            }).controller('ModalComentariosController',
                function ($scope, $http, $filter, $routeParams, $location, toaster, $modalInstance, proposicao, ComentarioResource,
                    ProposicaoResource, UsuarioResource, ComentarioService) {

                    var self = this;

                    $scope.proposicao = proposicao || new ProposicaoResource();
                    $scope.comentario = $scope.comentario || new ComentarioResource();

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

                    $scope.update = function () {
                        var successCallback = function () {
                            $scope.comentario = new ComentarioResource();
                            toaster.pop('success', 'Comentário atualizado com sucesso');
                        };
                        var errorCallback = function () {
                            toaster.pop('error', 'Falha ao realizar operação.');
                        };
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
                });