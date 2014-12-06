angular.module('sislegisapp').controller(
		'GerenciarReuniaoController',
		function($scope, $rootScope, $http, $filter, $routeParams, $location, $modal, $log, $timeout, toaster,
				ReuniaoResource, ProposicaoResource, ComentarioResource, PosicionamentoResource,
				ReuniaoProposicaoResource, TagResource, EncaminhamentoProposicaoResource) {
    
	var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.reuniao = new ReuniaoResource();
    $scope.reuniaoProposicao = new ReuniaoProposicaoResource();
    $scope.posicionamentos = PosicionamentoResource.queryAll();
    
    $scope.detalhamentoProposicao = false;
    
    $scope.loadTags = function(query) {
    	return TagResource.listarTodos().$promise;
    };     
    

    $scope.getPosicionamentos = function(current) {
        var copy = $scope.posicionamentos.slice(0);
        if (current) {
        	var item = new PosicionamentoResource();
        	item.nome = current;
        	copy.unshift(item);
        }
        return copy;
      };

    $scope.onSelectPosicionamentos = function (item) {
    	item.$save(function(success){
    		toaster.pop('success', 'Registro inserido com sucesso.');
    		$scope.posicionamentos.push(item);
    	});
    };
    
    $scope.isClean = function() {
        return angular.equals(self.original, $scope.reuniao);
    };

    $scope.save = function() {
        var successCallback = function(){
    		toaster.pop('success', 'Registro atualizado com sucesso.');
        };
        var errorCallback = function() {
        };
        $scope.selectedProposicao.$update(successCallback, errorCallback);
    };

    $scope.remove = function() {
        toaster.pop('success', 'Registro excluído com sucesso.');
        ReuniaoResource.remove({ReuniaoId:$scope.reuniao.id})
    };
    
    $scope.getProposicao = function(id) {

        var successCallback = function(data){
        	$scope.selectedProposicao = data;
        	$scope.listaEncaminhamentoProposicao = EncaminhamentoProposicaoResource.findByProposicao({ProposicaoId: $scope.selectedProposicao.id});
        	$scope.detalhamentoProposicao = true;
            $scope.displayError = false;
        };
        var errorCallback = function(error) {
            $scope.displayError=true;
        };
        
    	ProposicaoResource.get({ProposicaoId: id}, successCallback, errorCallback);
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
                $scope.displayError = false;
            };
            var errorCallback = function() {
            	$scope.displayError=true;
            };
    		
    		$scope.listaReuniaoProposicoes = ReuniaoResource.buscarReuniaoPorData({data : $scope.dataFormatada()}, successCallback, errorCallback);
    		$scope.detalhamentoProposicao = false;
    	}

    });
    
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
        	if(!$scope.reuniao.listaReuniaoProposicoes){
        		$scope.reuniao.listaReuniaoProposicoes = [];
        	}
        	$scope.listaReuniaoProposicoes = ReuniaoResource.buscarReuniaoPorData({data : $scope.dataFormatada()});
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });
    };

    
    $scope.abrirModalComentarios = function () {
    	
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
    

    $scope.abrirModalEncaminhamentos = function () {
    	
        var modalInstance = $modal.open({
          templateUrl: 'views/modal-encaminhamentos.html',
          controller: 'ModalEncaminhamentosController',
          size: 'lg',
          resolve: {
            proposicao: function () {
            	return $scope.selectedProposicao;
            },            
            listaEncaminhamentoProposicao: function (){
            	return $scope.listaEncaminhamentoProposicao;
            }          
          }
        });
        
        modalInstance.result.then(function (listaEncaminhamentoProposicao) {
        	$scope.listaEncaminhamentoProposicao = listaEncaminhamentoProposicao;
          }, function () {
        	  //when modal is dismissed
        	  //o certo era receber a lista como parametro, mas no dismiss nao consegui passar parametro, 
        	  //entao carrego a lista de novo para atualizar a qtde
          	$scope.listaEncaminhamentoProposicao = EncaminhamentoProposicaoResource.findByProposicao({ProposicaoId: $scope.selectedProposicao.id});
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
