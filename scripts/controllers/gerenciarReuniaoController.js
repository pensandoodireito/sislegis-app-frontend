angular.module('sislegisapp')
.directive('focusMe', function($timeout) {
  return {
    link: function(scope, element, attrs) {
      scope.$watch(attrs.focusMe, function(value) {
        if(value === true) { 
          
          $timeout(function() {
              try{
                   element[0].focus();
                   scope[attrs.focusMe] = false;
              }catch(e){
                  console.log(e);
              }
          },100);
        }
      });
    }
  };
}).controller(
		'GerenciarReuniaoController',
		function($scope, $rootScope, $http, $filter, $routeParams, $location, $modal, $log, $timeout, toaster,
				ReuniaoResource, ProposicaoResource, ComentarioResource, PosicionamentoResource, EquipeResource,
				ReuniaoProposicaoResource, EncaminhamentoProposicaoResource, ComentarioService, UsuarioResource,
                TipoEncaminhamentoResource, ElaboracaoNormativaResource, Auth,TagResource, $q, BACKEND) {
    console.log("RouteParams", $routeParams);
    
	var self = this;
    $scope.Auth=Auth;
	$scope.listaReuniaoProposicoes = [];
	$scope.filtro = new ProposicaoResource();
    if($routeParams.filter){
        $scope.filtro.sigla=$routeParams.filter.sigla;
        $scope.filtro.equipe=$routeParams.filter.equipe;
        $scope.filtro.estado=$routeParams.filter.estado;
    }
    $scope.sidebarPath = "views/Reuniao/sidebar-search.html";

	$scope.proposicoesSeguidas = [];
	UsuarioResource.proposicoesSeguidas({}, function(data) {
		console.log("Carregou proposicoes seguidas ", data);
		$scope.proposicoesSeguidas = data;
		console.log("Carregou proposicoes seguidas ", $scope.proposicoesSeguidas.length);
	}, function(data) {
		console.log("erro ao carregar proposicoes seguida", data);
	});

    // faz as ações de cada proposição abrir e fechar (collapse)
    $scope.showAcoes = true;
    
    $scope.reuniao = new ReuniaoResource();
    $scope.reuniaoProposicao = new ReuniaoProposicaoResource();
    $scope.tipoEncaminhamento = new TipoEncaminhamentoResource();
    $scope.listaTipoEncaminhamento = TipoEncaminhamentoResource.queryAll() || [];
    $scope.encaminhamentoProposicao = new EncaminhamentoProposicaoResource();
    $scope.posicionamentos = PosicionamentoResource.queryAll();
    
    $scope.listaRPOrigem = $scope.listaReuniaoProposicoes;
    $scope.listaRPComissao = $scope.listaReuniaoProposicoes;
    $scope.listaRPResponsavel = $scope.listaReuniaoProposicoes;

    $scope.allProposicoes = [];
    
    $scope.filtroTags = [];
    $scope.macrotemas = TagResource.listarTodos();
    $scope.equipes=[];
     EquipeResource.queryAll(function(data){
        for (var index = 0; index < data.length; index++) {
            var element = data[index];
            if(element.nome!="ASPAR"){
                $scope.equipes.push(element);
            }
            
        }
    });

	$scope.infiniteScroll = {
			busy: false,
			limit: 5,
			offset: 0
	}

    $scope.baixarTemplate = function (item) {

            // http://localhost:8080/sislegis/rest/proposicaos/2047/templateBriefing
            var back = BACKEND.substr(0, BACKEND.length - 5);
            window.open(back + "/template?id=" + item.id);
        };
    $scope.maisFiltros = function(){
        var selector = $($.AdminLTE.options.controlSidebarOptions.selector);
        $scope.isSidebarOpen = !$scope.isSidebarOpen;
        if($scope.isSidebarOpen){
            $.AdminLTE.controlSidebar.open(selector, false);
        }else{
            $.AdminLTE.controlSidebar.close(selector, false);
        }
    },
	
	$scope.consultarProposicoes = function() {
		if ($scope.infiniteScroll.busy) return;
		$scope.infiniteScroll.busy = true;
    	$rootScope.inactivateSpinner = true;
		
		var successCallback = function(data){
	    	$rootScope.inactivateSpinner = false;
		    if (data.length == 0) return;

		    for (var i = 0; i < data.length; i++) {
		    	$scope.listaReuniaoProposicoes.push(data[i]);
                
                
		    }
		    if ($scope.listaReuniaoProposicoes.length == 0) {
		    	toaster.pop('info', 'Nenhuma Proposição encontrada.');
		    	return;
		    }
		    $scope.infiniteScroll.offset += $scope.infiniteScroll.limit;
		    $scope.infiniteScroll.busy = false;
	    	$rootScope.inactivateSpinner = false;
		};
		var errorCallback = function() {
			toaster.pop('error', 'Falha ao consultar Proposição.');
	    	$rootScope.inactivateSpinner = false;
		};
		
		ProposicaoResource.consultar(
				{
					sigla: $scope.filtro.sigla,
					ementa: $scope.filtro.ementa,
					autor: $scope.filtro.autor,
					origem: $scope.filtro.origem,
					isFavorita: $scope.filtro.isFavorita,
                    macrotema: $scope.filtro.macrotema?$scope.filtro.macrotema.tag : null,
                    estado: $scope.filtro.estado!=""?$scope.filtro.estado:null,
                    idEquipe: $scope.filtro.equipe?$scope.filtro.equipe.id:null,
					limit: $scope.infiniteScroll.limit, 
					offset: $scope.infiniteScroll.offset
				},successCallback, errorCallback);
	}
	$scope.loadRevisoes=function(item){
        item.revisoes=ProposicaoResource.listaRevisoes({ ProposicaoId:item.id});
    }
	$scope.filtrarConsulta = function() {
		$scope.listaReuniaoProposicoes = [];
	    $scope.infiniteScroll.busy = false;
	    $scope.infiniteScroll.offset = 0;
		$scope.consultarProposicoes();
	}
    $scope.loadTags = function(query) {
    	return TagResource.buscarPorSufixo({sufixo: query}).$promise;
    };
    $scope.loadProposicoes = function(query) {
    	return ProposicaoResource.buscarPorSufixo({sufixo: query}).$promise;
    };
    
    $scope.loadElaboracoesNormativas = function(query) {
    	return ElaboracaoNormativaResource.buscarPorSufixo({sufixo: query}).$promise;
    };
    
    $scope.setSelectedProposicao = function(item,param) {
        
    	$scope.responsavelNull = (item.responsavel==null);
        $scope.initial = {
            explicacao:item.explicacao
        };
        if(param){
            $scope.initial[param]=item[param];
        }
		$scope.posicionamentoNull = (item.posicionamento==null);
    	$scope.selectedProposicao = item;
	}

    $scope.getPosicionamentos = function(current) {
        var copy = $scope.posicionamentos.slice(0);
        if (current) {
        	var item = new PosicionamentoResource();
        	item.nome = current;
        	copy.unshift(item);
        }
        return copy;
      };
    
    $scope.isClean = function() {
        return angular.equals(self.original, $scope.reuniao);
    };
    $scope.checkRemocaoResponsavel=function(item){
    	if(!item.responsavel && $scope.responsavelNull!=false){
    		$scope.responsavelNull=(item.responsavel==null);
    		$scope.save(item,"Responsável removido.");		
    	}
    };
    $scope.updates = {};
    $scope.setUpdated=function(field,item){
        $scope.updates[field]=item;
    }

    $scope.checkUpdatedField = function (field, item) {
        var updated = $scope.updates[field];
        
        if (updated == item) {
            if($scope.initial==null){
                console.log("nao foi inicializado initial")
            }
            if ($scope.initial==null || item[field] != $scope.initial[field]) {
                $scope.save(item);
            }
        }

    };
    $scope.setaEstado = function (item, estado) {
        var oldState = item.estado;
        item.estado = estado;
        $scope.save(item,"Fluxo de trabalho da proposição alterado","Falhou ao alterar proposição").then(function(){
            
        },function(){
            item.estado = oldState;
        })
    }
    //usado para atualizar a proposicao na lista
    $scope.updateSingleProposicao = function(item,toastMsg){
    	for (var i = 0; i < $scope.listaReuniaoProposicoes.length; i++) {    			
			if(item.id==$scope.listaReuniaoProposicoes[i].id){
				$scope.listaReuniaoProposicoes[i]=item;
				if(toastMsg){
					toaster.pop('success', toastMsg);
				}
				return true;
			}
		}
    	return false;
    }
    $scope.save = function (item, msgSucesso, msgErro) {
        var deferred = $q.defer();
        if (item) {
            $scope.setSelectedProposicao(item);
        }
        if (!msgSucesso) {
            msgSucesso = 'Proposição atualizada com sucesso.';
        }
        if (!msgErro) {
            msgErro = 'Falha salvar proposição.';
        }


        clear();

        $rootScope.inactivateSpinner = true;
        var successCallback = function () {
            $rootScope.inactivateSpinner = false;
            if ($scope.updateSingleProposicao(item, msgSucesso)) {
                deferred.resolve(item);
                return;
            }
            console.log("Nao carregou a proposicao, recarregara a reuniao inteira");
            ReuniaoResource.buscarReuniaoPorData({ data: $scope.dataFormatada() },
                function (response) {
                    $scope.listaReuniaoProposicoes = response;
                    deferred.resolve(item);
                }, function () {
                    console.error('Erro ao carregar proposições');
                    deferred.reject('Erro ao carregar proposições');
                });
            toaster.pop('success', msgSucesso);
        };
        var errorCallback = function () {
            $rootScope.inactivateSpinner = false;
            toaster.pop('error', msgErro);
            deferred.reject('Falha salvar proposição.');
        };
        ProposicaoResource.update($scope.selectedProposicao, successCallback, errorCallback);
        return deferred.promise;
    };
    
    
    $scope.previousPosicionamento=function(proposicao){
    	console.log("entrou o foco no posicionamento ",proposicao.posicionamentoAtual);
    	if(proposicao.posicionamentoAtual && proposicao.posicionamentoAtual.posicionamento){    		
    		proposicao.previousPosicionamentoNome = proposicao.posicionamentoAtual.posicionamento.nome;
    	}
    }
    $scope.checkAlteracaoSupar = function (item, left, $item, $model, $label) {
        if (left == 1) {
            item.posicionamentoSuparOld = item.posicionamentoSupar;
        } else if (left == 2) {
            console.log(item.posicionamentoSupar, $item, $model, $label);
        
        } else if (left == 4||left == 3) {
            if(item.posicionamentoSuparOld!=item.posicionamentoSupar){
                if(item.posicionamentoSupar==''){
                    item.posicionamentoSupar=null;
                }
                console.log("tem q salvar",item.posicionamentoSupar);
                $scope.save(item).then(function(){
                    item.posicionamentoSuparOld = item.posicionamentoSupar;
                },function(){
                    item.posicionamentoSupar=item.posicionamentoSuparOld;
                });
            }else{
                console.log("nada a fazer")
            }
        } else {
            console.log("saiu...", left)
        }
    }
    
    $scope.checkRemocaoPosicionamento=function(item){
        
         
		if(item.posicionamentoAtual && item.posicionamentoAtual.posicionamento==null){
            
			$scope.alterarPosicionamento(item,null);
		}
	};
    $scope.alterarPosicionamento = function (proposicao, posicionamentoSelecionado, $label) {
        
        if (proposicao) {
            $scope.setSelectedProposicao(proposicao);
        }

        if (posicionamentoSelecionado != null) {
            if (proposicao.previousPosicionamentoNome && proposicao.previousPosicionamentoNome == posicionamentoSelecionado.nome) {
                console.log("não alterou o posicionamento")
                return;
            }
        } else if (proposicao.previousPosicionamentoNome == null) {
            console.log("não alterou o posicionamento")
            return;
        }



        if (posicionamentoSelecionado && posicionamentoSelecionado.nome != null && posicionamentoSelecionado.id == null) {
            toaster.pop('error', 'Selecione um posicionamento válido.');
            return;
        }
        clear();

        
        var errorCallback = function () {
            toaster.pop('error', 'Falha ao atualizar posicionamento.');
        };

        var isPreliminar = posicionamentoSelecionado && posicionamentoSelecionado.nome.indexOf('Previamente ') != -1;
        var idPosicionamento = null;
        var successCallback = function () {
            toaster.pop('success', 'Posicionamento removido com sucesso.');
        };
        if (posicionamentoSelecionado && posicionamentoSelecionado.id != null) {
            idPosicionamento = posicionamentoSelecionado.id;
            successCallback = function () {
                toaster.pop('success', 'Posicionamento atualizado com sucesso.');
            };
        }
        ProposicaoResource.alterarPosicionamento({ id: $scope.selectedProposicao.id, idPosicionamento: idPosicionamento, preliminar: isPreliminar }, successCallback, errorCallback);


    }
    
    var clear = function() {
    	delete $scope.selectedProposicao.comentarioTmp;
	}
    
    $scope.dataFormatada = function(){
        var formattedDate = $filter('date')(new Date($scope.reuniao.data),
        	'MM/dd/yyyy');
        return formattedDate;
    };
    
    $scope.expandProposicao = function(proposicao){
    	
        $scope.setSelectedProposicao(proposicao);
        if(!$scope.selectedProposicao.fullyLoaded){
	        proposicao.loading=true;
	        $scope.selectedProposicao = ProposicaoResource.get({ProposicaoId:proposicao.id,fetchAll:true},function(){
	        	proposicao.loading=false;
	        	$scope.selectedProposicao.fullyLoaded=true;
	        });
        }
        

//        // Popula comentarios
//        if ($scope.selectedProposicao.listaComentario == null || $scope.selectedProposicao.listaComentario.length != $scope.selectedProposicao.totalComentarios) {
//            $scope.selectedProposicao.listaComentario = ComentarioResource.findByProposicao({
//                    ProposicaoId: $scope.selectedProposicao.id}
//            );
//        }
//
//        // Popula encaminhamentos
//        if ($scope.selectedProposicao.listaEncaminhamentoProposicao == null || $scope.selectedProposicao.listaEncaminhamentoProposicao.length != $scope.selectedProposicao.totalEncaminhamentos){
//            $scope.selectedProposicao.listaEncaminhamentoProposicao = EncaminhamentoProposicaoResource.findByProposicao({
//                    ProposicaoId: $scope.selectedProposicao.id}
//            );
//        }
    };

    $scope.$watch("reuniao.data", function() {
    	if(!angular.isUndefined($scope.reuniao.data)){
    		
    		var successCallback = function(){
                if ($scope.listaReuniaoProposicoes.length == 0) {
                	toaster.pop('info', 'Não existem proposições para esta data. Você pode adicionar novas proposições.');
                }
                $scope.clearFilters();
            };
            var errorCallback = function() {
            	toaster.pop('error', 'Falha ao buscar Reunião.');
            };

            $scope.exibirAdicionar = true;
    		
    		$scope.listaReuniaoProposicoes = ReuniaoResource.buscarReuniaoPorData({data : $scope.dataFormatada()}, successCallback, errorCallback);
    	}

    });

    $scope.$watch('listaReuniaoProposicoes', function(newValue) {
        $scope.listaRPOrigem = $scope.listaReuniaoProposicoes;
        $scope.listaRPComissao = $scope.listaReuniaoProposicoes;
        $scope.listaRPResponsavel = $scope.listaReuniaoProposicoes;
	});
    
    $scope.changeFiltroComissao = function() {
		if(!$scope.filtroComissao.comissao){
			$scope.filtroComissao = null;
		}
	}
    
    $scope.checkResponsavelNaoDefinido = function(){
    	if($scope.filtroResponsavelNaoDefinido){
    		$scope.filtroResponsavel = null;
    	}else{
    		$scope.filtroResponsavelNaoDefinido = "";
    	}
    }
    
    $scope.checkPosicionamentoNaoDefido = function(){
        console.log("checkPosicionamentoNaoDefinido");
    	if($scope.filtroPosicionamentoNaoDefido){
    		$scope.filtroPosicionamento = null;
    	}else{
    		$scope.filtroPosicionamentoNaoDefido = "";
    	}
    }
    
    $scope.isFollowed = function(item) {

		for (var i = 0; i < $scope.proposicoesSeguidas.length; i++) {
			var proposicao = $scope.proposicoesSeguidas[i];
			if (item.id == proposicao.id) {
				return true;
			}
		}
		return false;
	};
	$scope.followProposicao = function(item) {
		

		ProposicaoResource.followProposicao({}, {
			id : item.id
		}, function() {
			$scope.proposicoesSeguidas.push({
				id : item.id
			});
		});

	};
	$scope.unfollowProposicao = function(item) {
		ProposicaoResource.unfollowProposicao({}, {
			id : item.id
		}, function() {
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

	$scope.checkUpdates = function(item){
		ProposicaoResource.syncManually({}, {
			id : item.id
		}, function(data,b) {
			console.log("data",data,b);
			 if($scope.updateSingleProposicao(data,'Proposicao atualizada')){
        		 return;
        	}			
			
		}, function(data) {
			console.log("data",data);
			if(data.status==304){
				toaster.pop('info', 'Nenhuma atualização detectada');				
			}
		});
	}

    
    $scope.changeFiltroOrigem = function() {
		if(!$scope.filtroOrigem.origem){
			$scope.filtroOrigem = null;
		}
		$scope.filtroComissao = null;
	}
    
	$scope.getUsuarios = function(val, buscaGeral) {
        var method = (buscaGeral) ? 'ldapSearch' : 'find';
return UsuarioResource.buscaPorUsuario({ method: method, nome: val },{ method: method, nome: val },function(data){console.log("aee",data)}).$promise;
    
	  };

    $scope.abrirModalBuscaProposicaoAvulsa = function () {
        toaster.clear();
        var modalInstance = $modal.open({
            templateUrl: 'views/modal-add-proposicao.html',
            controller: 'ModalAddProposicaoController',
            size: 'lg'
        });

        modalInstance.result.then(function () {

        }, function () {
            // $log.info('Modal dismissed at: ' + new Date());
        });
    };

	
	    
    /**
     * MODALs
     */
    $scope.buscarProposicoes = function () {
    	toaster.clear();
    	
    	if($scope.reuniao.data == null){
            $scope.reuniao.data=new Date();
    		// toaster.pop('info', 'Selecione a data da reunião.');
    		// return;
    	}
    	
        var modalInstance = $modal.open({
          templateUrl: 'views/modal-buscar-proposicao.html',
          controller: 'ModalBuscarProposicaoController',
          size: 'lg',
          resolve: {
            reuniao: function () {
            	return $scope.reuniao;
            },
            reuniaoProposicao: function () {
            	$scope.reuniaoProposicao.reuniao = $scope.reuniao;
            	return $scope.reuniaoProposicao;
            },            
            listaProposicaoSelecao: function (){
            	return $scope.reuniao.listaReuniaoProposicoes;
            }
          }
        });
        
        modalInstance.result.then(function (listaProposicaoSelecao) {
        	if (listaProposicaoSelecao.length > 0) {
        		$scope.listaReuniaoProposicoes = ReuniaoResource.buscarReuniaoPorData({data : $scope.dataFormatada()});
        	}
        }, function () {
            // $log.info('Modal dismissed at: ' + new Date());
        });
    };
    
    
    $scope.incluirComentario = function(item){
    	var comentario = new ComentarioResource();
    	comentario.descricao = item.comentarioTmp;
    	item.comentarioTmp = null;
    	
    	var successCallback = function(data,responseHeaders){
    		item.listaComentario.push(data);
    		item.totalComentarios++;
        	toaster.pop('success', 'Comentário inserido com sucesso');
        };
        var errorCallback = function() {
        	toaster.pop('error', 'Falha ao realizar operação.');
        };
        
		ComentarioService.save(comentario, item.id).then(successCallback, errorCallback);
    }

    // $scope.populaProposicao=function(item){
    //     if (item.listaComentario == null || item.listaComentario.length != item.totalComentarios) {
    //         $scope.populaComentario(item);    
    //     }
    // }
   
    
     $scope.populaNotas = function (prop, callbackFct) {
        ProposicaoResource.listNotaTecnicas({ ProposicaoId: prop.id }, function (lista) {
            prop.listaNotas = lista;
            if (callbackFct != null) {
                callbackFct();
            }
        }
            );
    }
	$scope.abrirModalParecerAreaMerito= function (item,revisao) {
        $scope.selectedProposicao= item;
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
                $scope.selectedProposicao.listaNotas = listaNotas;
                console.log(listaNotas)
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
    }	
    $scope.populaNotas = function (prop, callbackFct) {
        ProposicaoResource.listNotaTecnicas({ ProposicaoId: prop.id }, function (lista) {
            prop.listaNotas = lista;
            if (callbackFct != null) {
                callbackFct();
            }
        }
            );
    }
    $scope.abrirModalNotaTecnica = function (item) {
       $scope.selectedProposicao= item;
        if ($scope.selectedProposicao.listaNotas == null || $scope.selectedProposicao.listaNotas.length != $scope.selectedProposicao.totalNotasTecnicas) {
            $scope.populaNotas(item, function () { $scope.abrirModalNotaTecnica(item) });
        } else {


            var modalInstance = $modal.open({
                templateUrl: 'views/modal-notatecnicas.html',
                controller: 'ModalNotaTecnicaController',
                size: 'lg',
                resolve: {
                    proposicao: function () {
                        return $scope.selectedProposicao;
                    }
                }
            });

            modalInstance.result.then(function (prop) {
                $scope.selectedProposicao = prop;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
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
    $scope.abrirModalComentarios = function (item,cb) {
        $scope.selectedProposicao = item;
        if (cb!=true && ( $scope.selectedProposicao.listaComentario == null || $scope.selectedProposicao.listaComentario.length != $scope.selectedProposicao.totalComentarios)) {
            $scope.populaComentario(item, function (prop) { 
                $scope.abrirModalComentarios(prop,true); 
              }
             );
        } else {


            var modalInstance = $modal.open({
                templateUrl: 'views/modal-comentarios.html',
                controller: 'ModalComentariosController',
                size: 'lg',
                resolve: {
                    proposicao: function () {
                        return $scope.selectedProposicao;
                    }
                }
            });

            modalInstance.result.then(function (listaComentario) {
                $scope.selectedProposicao.listaComentario = listaComentario;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }

	
    
    $scope.abrirModalRemoverProposicao = function(item) {
    	$scope.selectedProposicao = item;
    	
    	var modalInstance = $modal.open({
    		templateUrl: 'views/Reuniao/modal-remover-proposicao.html',
    		controller: 'ModalRemoverProposicaoController',
    		size: 'sm',
    		resolve: {
    			data:function(){
    				return  $scope.dataFormatada();
    			},
                proposicao: function () {
                	return $scope.selectedProposicao;
                }
            }
    	});
    	
    	modalInstance.result.then(function () {
    		ReuniaoResource.buscarReuniaoPorData({data : $scope.dataFormatada()},
        	function(response) {
        		$scope.listaReuniaoProposicoes = response;
        		toaster.pop('success', 'Proposição excluída da reunião');
        	}, function() {
        		console.error('Erro ao carregar proposições');
        	});
        });
    }

    $scope.getPrintPath = function(){
        return $scope.printPath;
    }

    $scope.abrirModalProposicao = function(){
        // Adição para view de impressão da proposição
        $scope.proposicao = $scope.selectedProposicao;
        $scope.printPath = 'views/Reuniao/imprimir-proposicao.html';
        var modalInstance = $modal.open({
            templateUrl: 'views/Reuniao/modal-relatorio.html',
            controller: 'ModalRelatorioProposicaoController',
            size: 'lg',
            resolve: {
                proposicao: function(){

					$scope.expandProposicao($scope.proposicao);

                    if(!$scope.selectedProposicao.listaPautas){
                        $scope.selectedProposicao.listaPautas = ProposicaoResource.buscarPautas({ProposicaoId: $scope.selectedProposicao.id})
                    }

					return $scope.selectedProposicao;
                },
                printPath: function(){
                    return $scope.printPath;
                }
            }
        });
    }

    $scope.loadComentarios = function(lista){
        if (typeof lista != 'undefined' && lista.length > 0){
            lista.forEach(function(item){
                item.listaComentario = ComentarioResource.findByProposicao({ProposicaoId: item.id});
            });
        }
    }

    $scope.loadEncaminhamentos = function(lista){
        if (typeof lista != 'undefined' && lista.length > 0){
            lista.forEach(function(item){
                item.listaEncaminhamentoProposicao = EncaminhamentoProposicaoResource.findByProposicao({ProposicaoId: item.id});
            });
        }
    }
    
    $scope.abrirModalRelatorio = function() {

        $scope.listaReuniaoProposicoes = ReuniaoResource.buscarReuniaoPorData({data : $scope.dataFormatada(),fetchAll : true});

        $scope.printPath = 'views/Reuniao/imprimir.html';
        var modalInstance = $modal.open({
          templateUrl: 'views/Reuniao/modal-relatorio.html',
          controller: 'ModalRelatorioReuniaoController',
          size: 'lg',
          resolve: {
        	listaReuniaoProposicoes: function () {
            	return $scope.listaReuniaoProposicoes;
            },
            filtroGlobal: function() {
        		return $scope.filtroGlobal;
        	},
        	filtroOrigem: function() {
        		return $scope.filtroOrigem;
        	},
        	filtroComissao: function() {
        		return $scope.filtroComissao;
        	},
        	filtroFavorita: function() {
        		return $scope.filtroFavorita;
        	},
        	filtroTags: function() {
        		return $scope.filtroTags;
        	},
            filtroResponsavel: function() {
                return $scope.filtroResponsavel;
            },
            filtroPosicionamento: function(){
                return $scope.filtroPosicionamento;
            },
            filtroResponsavelNaoDefinido: function(){
                return $scope.filtroResponsavelNaoDefinido;
            },
            filtroPosicionamentoNaoDefido: function(){
                return $scope.filtroPosicionamentoNaoDefido;
            },
            printPath: function(){
                return $scope.printPath;
            }
          }
        });
    };

	$scope.populaModalEncaminhamentos = function(lista)
	{
		$scope.selectedProposicao.listaEncaminhamentoProposicao = lista;
		var modalInstance = $modal.open({
			templateUrl: 'views/modal-encaminhamentos.html',
			controller: 'ModalEncaminhamentosController',
			size: 'lg',
			resolve: {
				proposicao: function () {
					return $scope.selectedProposicao;
				}
			}
		});

		modalInstance.result.then(function (listaEncaminhamentos){
			$scope.selectedProposicao.listaEncaminhamentoProposicao = listaEncaminhamentos;
		}, function(){
			$log.info('Modal dismissed at: ' + new Date());
		});
	}

    $scope.abrirModalEncaminhamentos = function (item) {
    	$scope.selectedProposicao = item;

		if ($scope.selectedProposicao.listaEncaminhamentoProposicao == null || $scope.selectedProposicao.listaEncaminhamentoProposicao.length != $scope.selectedProposicao.totalEncaminhamentos){
			EncaminhamentoProposicaoResource.findByProposicao({
				ProposicaoId: $scope.selectedProposicao.id}, $scope.populaModalEncaminhamentos
			);
		} else{
			$scope.populaModalEncaminhamentos($scope.selectedProposicao.listaEncaminhamentoProposicao);
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

    $scope.clearFilters = function(){
        delete $scope.filtroGlobal;
        delete $scope.filtroOrigem;
        delete $scope.filtroComissao;
        delete $scope.filtroFavorita;
        delete $scope.filtroResponsavel;
        delete $scope.filtroPosicionamento;
        delete $scope.filtroResponsavelNaoDefinido;
        delete $scope.filtroPosicionamentoNaoDefido;
        
    };

    $scope.getComissaoCamara = function(){
        return ComissaoResource.getComissaoCamara().$promise;
    };

    $scope.addEncaminhamento = function(){

        $scope.encaminhamentoProposicao.proposicao = new ProposicaoResource();
        $scope.encaminhamentoProposicao.proposicao.id = $scope.selectedProposicao.id;
        if ($scope.encaminhamentoProposicao.dataHoraLimite != null) {
            $scope.encaminhamentoProposicao.dataHoraLimite = $scope.encaminhamentoProposicao.dataHoraLimite
                .getTime();
        }

        var successCallback = function(data, responseHeaders) {
            EncaminhamentoProposicaoResource.findByProposicao({
                ProposicaoId : $scope.selectedProposicao.id
            }, function(data) {
                $scope.selectedProposicao.listaEncaminhamentoProposicao = data;
                $scope.selectedProposicao.totalEncaminhamentos++;
                $scope.encaminhamentoProposicao = new EncaminhamentoProposicaoResource();
                $scope.tipoEncaminhamento = new TipoEncaminhamentoResource();
                $rootScope.$emit('updateEncaminhamentos');
                toaster.pop('success', 'Encaminhamento inserido com sucesso');
            });
        };
        var errorCallback = function() {
            toaster.pop('error', 'Falha ao realizar operação.');
        };
        EncaminhamentoProposicaoResource.save($scope.encaminhamentoProposicao, successCallback, errorCallback);
    };

});


angular.module('sislegisapp').controller('ModalRemoverProposicaoController',
		function($scope, $http, $filter, $routeParams, $location, toaster, $modalInstance, proposicao, data, ProposicaoResource, ReuniaoProposicaoResource, ComentarioResource, ComentarioService) {
	
	var self = this;
	
	$scope.proposicao = proposicao;
	$scope.data = data;
	$scope.comentario = $scope.comentario || new ComentarioResource();

	$scope.ok = function() {
		$modalInstance.close();
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
	
	$scope.removerProposicao = function() {
		var successCallback = function() {
			$scope.ok();
        };
        var errorCallback = function() {
        	toaster.pop('error', 'Erro ao excluir proposição da reunião');
        };

        ComentarioService.save($scope.comentario, $scope.proposicao.id);
        ReuniaoProposicaoResource.remove({ReuniaoId:data, ProposicaoId: $scope.proposicao.id}, successCallback, errorCallback);
    };
});
