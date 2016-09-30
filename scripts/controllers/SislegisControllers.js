
var angular;
angular.module('sislegisapp')
    .controller('ProposicaoItemController', function ($scope, $rootScope, $http, $filter, $routeParams, $location, $modal, $log, $timeout, toaster,
        ProposicaoResource, ComentarioResource, PosicionamentoResource, EquipeResource,
        EncaminhamentoProposicaoResource, ComentarioService, UsuarioResource,
        TipoEncaminhamentoResource, Auth, TagResource, $q, BACKEND) {



        $scope.abrirModalParecerAreaMerito = function (item) {
            var modalInstance = $modal.open({
                templateUrl: 'views/modal-parecer-areamerito.html',
                controller: 'ModalParecerAreaMeritoController',
                size: 'lg',
                resolve: {
                    proposicao: function () {
                        return item;
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
        $scope.$watch('proposicao.poaaasicionamentoAtual', function (newValue, oldValue, scope) {
            if (oldValue == null && newValue == null) {
                console.log("old null")
                return;
            }
            console.log("posicionamento ", oldValue, "is", newValue);
            var errorCallback = function () {
                toaster.pop('error', 'Falha ao atualizar posicionamento.');
            };
            var posicionamentoSelecionado = newValue.posicionamento;
            var isPreliminar = posicionamentoSelecionado && posicionamentoSelecionado.nome.indexOf('Previamente ') != -1;
            var idPosicionamento = null;
            var successCallback = function (data) {
                $scope.proposicao.posicionamentoAtual = data;
                toaster.pop('success', 'Posicionamento removido com sucesso.');
            };
            if (posicionamentoSelecionado && posicionamentoSelecionado.id != null) {
                idPosicionamento = posicionamentoSelecionado.id;
                successCallback = function () {
                    toaster.pop('success', 'Posicionamento atualizado com sucesso.');
                };
            }
            ProposicaoResource.alterarPosicionamento({ id: $scope.proposicao.id, idPosicionamento: idPosicionamento, preliminar: isPreliminar }, successCallback, errorCallback);
        });
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
        $scope.info = DashboardService.get();
        $scope.tarefas = TarefaResource.buscarPorUsuario();
    })
    .controller('DespachoController', function ($scope, $rootScope, $http, $filter, $routeParams, $location, $modal, $log, $timeout, toaster,
        ProposicaoResource, ComentarioResource, PosicionamentoResource, EquipeResource,
        EncaminhamentoProposicaoResource, ComentarioService, UsuarioResource,
        TipoEncaminhamentoResource, Auth, TagResource, $q, BACKEND) {
        $scope.proposicoes = [];
        $scope.Auth = Auth;
        $scope.posicionamentos = PosicionamentoResource.queryAll();
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

        $scope.equipes = EquipeResource.queryAll();


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
            if ($scope.area.contato.id == null) {
                toaster.pop('error', 'Um usuário deve ser selecionado/criado para ser o contato dessa Área de Mérito');
                return;
            }
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
            $confirm({ text: 'Deseja realmente apagar essa área de mérito? Qualquer parecer associado a ela será apagado.', title: 'Apagar área de mérito', ok: 'Sim', cancel: 'Não' })
                .then(removeIt);
        };


        $scope.get();
    }).controller('NotaTecnicaController',
        function ($scope, $rootScope, $http, $filter, $routeParams, $location, $log, $timeout, toaster,
            ProposicaoResource, ComentarioResource, PosicionamentoResource, ComissaoResource, BACKEND, $q) {



        }).controller('ModalParecerAreaMeritoController',
            function ($scope, $http, $filter, $routeParams, $location, toaster, $modalInstance, proposicao, ComentarioResource,
                ProposicaoResource, UsuarioResource, ComentarioService, PosicionamentoResource) {


                $scope.areaMeritos = ProposicaoResource.listaAreaMerito();

                $scope.revisao = {
                    proposicao: proposicao
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

                });