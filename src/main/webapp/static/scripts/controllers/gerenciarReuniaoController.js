angular.module('sislegisapp').controller(
		'GerenciarReuniaoController',
		function($scope, $rootScope, $http, $filter, $routeParams, $location, $modal, $log, $timeout, toaster,
				ReuniaoResource, ProposicaoResource, ComentarioResource, PosicionamentoResource,
				ReuniaoProposicaoResource, TagResource, EncaminhamentoProposicaoResource, ComentarioService) {
    
	var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.arrayComissao = new Array();
    $scope.selectedFiltro = new Object();
    
    $scope.reuniao = new ReuniaoResource();
    $scope.reuniaoProposicao = new ReuniaoProposicaoResource();
    $scope.posicionamentos = PosicionamentoResource.queryAll();
    
    $scope.listaRPOrigem = $scope.listaReuniaoProposicoes;
    $scope.listaRPComissao = $scope.listaReuniaoProposicoes;
    
    $scope.detalhamentoProposicao = false;
    
    $scope.loadTags = function(query) {
    	return TagResource.listarTodos().$promise;
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
    
    $scope.save = function() {
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

    $scope.remove = function() {
        toaster.pop('success', 'Registro excluído com sucesso.');
        ReuniaoResource.remove({ReuniaoId:$scope.reuniao.id})
    };
    
    $scope.getProposicao = function(id) {
        var successCallback = function(data){
        	$scope.selectedProposicao = data;
        	$scope.detalhamentoProposicao = true;
            $scope.displayError = false;
        };
        var errorCallback = function(error) {
            $scope.displayError=true;
        };
        
    	ProposicaoResource.get({ProposicaoId: id}, successCallback, errorCallback);
    }
    
    $scope.getComissao = function(item) {
    	var obj = new Object();
    	obj.id = item.id;
    	obj.comissao = item.comissao;
    	for (var int = 0; int < $scope.arrayComissao.length; int++) {
			var array_element = $scope.arrayComissao[int];
			
			if(array_element.comissao == item.comissao && array_element.id != item.id){
				return false;
			}
		}
		obj.show = true;
		$scope.arrayComissao.push(obj);
    	return true;
	}	
    
    $scope.removerProposicao = function(id){
    	if(confirm("Deseja realmente excluir esse registro?")){
    		var successCallback = function(){
            	
            	ReuniaoResource.buscarReuniaoPorData({data : $scope.dataFormatada()},
            	function(sucess){
            		$scope.listaReuniaoProposicoes = sucess;
            		if($scope.selectedProposicao.id == id){
            			$scope.selectedProposicao = null;
            			$scope.detalhamentoProposicao = false;
            		}
            	},function(){
                	$scope.displayError=true;
            	});
            };
            var errorCallback = function() {
            	$scope.displayError=true;
            };
            
        	ProposicaoResource.remove({ProposicaoId: id}, successCallback, errorCallback);
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
    		$scope.detalhamentoProposicao = false;
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
            $log.info('Modal dismissed at: ' + new Date());
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
