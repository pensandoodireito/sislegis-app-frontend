angular.module('sislegisapp').controller(
		'GerenciarReuniaoController',
		function($scope, $rootScope, $http, $filter, $routeParams, $location, $modal, $log, $timeout, toaster,
				ReuniaoResource, ProposicaoResource, ComentarioResource, PosicionamentoResource, EquipeResource,
				ReuniaoProposicaoResource, TagResource, EncaminhamentoProposicaoResource, ComentarioService, UsuarioResource, ElaboracaoNormativaResource) {
    
	var self = this;
	$scope.listaReuniaoProposicoes = [];
	$scope.filtro = new ProposicaoResource();

    // faz as ações de cada proposição abrir e fechar (collapse)
    $scope.showAcoes = true;
    
    $scope.reuniao = new ReuniaoResource();
    $scope.reuniaoProposicao = new ReuniaoProposicaoResource();
    $scope.posicionamentos = PosicionamentoResource.queryAll();
    
    $scope.listaRPOrigem = $scope.listaReuniaoProposicoes;
    $scope.listaRPComissao = $scope.listaReuniaoProposicoes;

    $scope.allProposicoes = [];
    
    $scope.tagsProposicaoSelecionadas = [];
    $scope.tagsProposicao = TagResource.listarTodos();

	$scope.infiniteScroll = {
			busy: false,
			limit: 5,
			offset: 0
	}
	
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
					limit: $scope.infiniteScroll.limit, 
					offset: $scope.infiniteScroll.offset
				},successCallback, errorCallback);
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
    	return ElaboracaoNormativaResource.queryAll().$promise;
    };
    
    $scope.setSelectedProposicao = function(item) {
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
    
    $scope.save = function(item) {
    	if(item){
    		$scope.setSelectedProposicao(item);
    	}
    		
    	clear();
    	
    	$rootScope.inactivateSpinner = true;
        var successCallback = function(){
        	$rootScope.inactivateSpinner = false;
        	$scope.tagsProposicao = TagResource.listarTodos();
    		toaster.pop('success', 'Proposição atualizada com sucesso.');
        };
        var errorCallback = function() {
        	$rootScope.inactivateSpinner = false;
        	toaster.pop('error', 'Falha salvar proposição.');
        };
        ProposicaoResource.update($scope.selectedProposicao, successCallback, errorCallback);
    };
    
    var clear = function() {
    	delete $scope.selectedProposicao.comentarioTmp;
	}
    
    $scope.dataFormatada = function(){
        var formattedDate = $filter('date')(new Date($scope.reuniao.data),
        	'MM/dd/yyyy');
        return formattedDate;
    };
    
    $scope.$watch("reuniao.data", function() {
    	if(!angular.isUndefined($scope.reuniao.data)){
    		
    		var successCallback = function(){
                if ($scope.listaReuniaoProposicoes.length == 0) {
                	toaster.pop('info', 'Não existem proposições para esta data. Você pode adicionar novas proposições.');
                }
            };
            var errorCallback = function() {
            	toaster.pop('error', 'Falha ao buscar Reunião.');
            };
    		
    		$scope.listaReuniaoProposicoes = ReuniaoResource.buscarReuniaoPorData({data : $scope.dataFormatada()}, successCallback, errorCallback);
    	}

    });
    
    $scope.$watch('listaReuniaoProposicoes', function() {
        $scope.listaRPOrigem = $scope.listaReuniaoProposicoes;
        $scope.listaRPComissao = $scope.listaReuniaoProposicoes;
	});
    
    $scope.changeFiltroComissao = function() {
		if(!$scope.filtroComissao.comissao){
			$scope.filtroComissao = null;
		}
	}

    $scope.changeFiltroOrigem = function() {
		if(!$scope.filtroOrigem.origem){
			$scope.filtroOrigem = null;
		}
		$scope.filtroComissao = null;
	}
    
	$scope.getUsuarios = function(val) {
	    return $http.get('../rest/usuarios/find', {
	      params: {
	        nome: val
	      }
	    }).then(function(response){
	      return response.data.map(function(item){
	        return item;
	      });
	    });
	  };

    /**
     * MODALs
     */
    $scope.buscarProposicoes = function () {
    	toaster.clear();
    	
    	if($scope.reuniao.data == null){
    		toaster.pop('info', 'Selecione a data da reunião.');
    		return;
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
			item.listaComentario.push(comentario);
        	toaster.pop('success', 'Comentário inserido com sucesso');
        };
        var errorCallback = function() {
        	toaster.pop('error', 'Falha ao realizar operação.');
        };
        
		ComentarioService.save(comentario, item.id).then(successCallback, errorCallback);
    }

    
    $scope.abrirModalComentarios = function(item) {
    	$scope.selectedProposicao = item;
    	
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
    };
    
    $scope.abrirModalRemoverProposicao = function(item) {
    	$scope.selectedProposicao = item;
    	
    	var modalInstance = $modal.open({
    		templateUrl: 'views/Reuniao/modal-remover-proposicao.html',
    		controller: 'ModalRemoverProposicaoController',
    		size: 'sm',
    		resolve: {
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
    
    $scope.abrirModalRelatorio = function() {
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
        	}
          }
        });
    };
    
    $scope.abrirModalEncaminhamentos = function (item) {
    	$scope.selectedProposicao = item;
    	
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
        
        modalInstance.result.then(function (selectedProposicao) {
        	$scope.selectedProposicao = selectedProposicao;
          }, function () {
        	  //when modal is dismissed
        	  //o certo era receber a lista como parametro, mas no dismiss nao consegui passar parametro, 
        	  //entao carrego a lista de novo para atualizar a qtde
          	$scope.selectedProposicao.listaEncaminhamentoProposicao = EncaminhamentoProposicaoResource.findByProposicao({ProposicaoId: $scope.selectedProposicao.id});
            $log.info('Modal dismissed at: ' + new Date());
          });
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


angular.module('sislegisapp').controller('ModalRemoverProposicaoController',
		function($scope, $http, $filter, $routeParams, $location, toaster, $modalInstance, proposicao, ProposicaoResource, ReuniaoProposicaoResource, ComentarioResource, ComentarioService) {
	
	var self = this;
	
	$scope.proposicao = proposicao;
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
        ReuniaoProposicaoResource.remove({ReuniaoId:$scope.proposicao.idReuniao, ProposicaoId: $scope.proposicao.id}, successCallback, errorCallback);
    };
});
