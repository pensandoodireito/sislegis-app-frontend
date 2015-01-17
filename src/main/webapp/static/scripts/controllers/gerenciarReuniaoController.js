angular.module('sislegisapp').controller(
		'GerenciarReuniaoController',
		function($scope, $rootScope, $http, $filter, $routeParams, $location, $modal, $log, $timeout, toaster,
				ReuniaoResource, ProposicaoResource, ComentarioResource, PosicionamentoResource, EquipeResource,
				ReuniaoProposicaoResource, TagResource, EncaminhamentoProposicaoResource, ComentarioService, UsuarioResource) {
    
	var self = this;
	
	$scope.consultarProposicoes = function() {
		var successCallback = function(){
			if ($scope.listaReuniaoProposicoes.length == 0) {
				toaster.pop('info', 'Nenhuma Proposição encontrada.');
			}
		};
		var errorCallback = function() {
			toaster.pop('error', 'Falha ao consultar Proposição.');
		};
		
		$scope.listaReuniaoProposicoes = ProposicaoResource.queryAll(successCallback, errorCallback);
	}

    // faz as ações de cada proposição abrir e fechar (collapse)
    $scope.showAcoes = true;

    $scope.arrayComissao = new Array();
    $scope.selectedFiltro = new Object();
    
    $scope.reuniao = new ReuniaoResource();
    $scope.reuniaoProposicao = new ReuniaoProposicaoResource();
    $scope.posicionamentos = PosicionamentoResource.queryAll();
    
    $scope.listaRPOrigem = $scope.listaReuniaoProposicoes;
    $scope.listaRPComissao = $scope.listaReuniaoProposicoes;
    
    $scope.loadTags = function(query) {
    	return TagResource.buscarPorSufixo({sufixo: query}).$promise;
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
    
    $scope.removerProposicao = function(idReuniao, idProposicao){
    	if(confirm("Deseja realmente excluir esse registro?")){
    		var successCallback = function() {
    			toaster.pop('success', 'Registro excluído com sucesso');
            	ReuniaoResource.buscarReuniaoPorData({data : $scope.dataFormatada()},
            	function(response) {
            		$scope.listaReuniaoProposicoes = response;
            	}, function() {
            		console.error('Erro ao carregar proposições');
            	});
            };
            var errorCallback = function() {
            	toaster.pop('error', 'Falha ao remover a proposição');
            };
            
            //ReuniaoProposicaoResource.remove({ProposicaoId: id}, successCallback, errorCallback);
            
        	//ProposicaoResource.remove({ProposicaoId: id}, successCallback, errorCallback);
            //ProposicaoResourceAux.remove({ProposicaoId: id, ReuniaoId:1}, successCallback, errorCallback);
            console.log(idReuniao + ' ' + idProposicao);
            ReuniaoProposicaoResource.remove({ReuniaoId:idReuniao, ProposicaoId: idProposicao}, successCallback, errorCallback);
    	}

    }; 
    
    
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
        	$scope.listaReuniaoProposicoes = ReuniaoResource.buscarReuniaoPorData({data : $scope.dataFormatada()});
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

    
    $scope.abrirModalComentarios = function (item) {
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
