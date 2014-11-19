angular.module('sislegisapp').controller(
		'GerenciarReuniaoController',
		function($scope, $rootScope, $http, $filter, $routeParams, $location, $modal, $log, $timeout,
				ReuniaoResource, ProposicaoResource, ComentarioResource, PosicionamentoResource, 
				ReuniaoProposicaoResource, TagResource, EncaminhamentoProposicaoResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.reuniao = new ReuniaoResource();
    $scope.reuniaoProposicao = new ReuniaoProposicaoResource();
    
    $scope.detalhamentoProposicao = false;
    
    $scope.loadTags = function(query) {
    	return TagResource.listarTodos().$promise;
    };     
    

    
    $scope.alerts = [];

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
    
    var addAlert = function(alert){
    	$scope.alerts.push(alert);
    	$timeout(function(){
    		$scope.alerts.splice($scope.alerts.indexOf(alert), 1);
    	}, 3000); // maybe '}, 3000, false);' to avoid calling apply
    }
    
    
    
    /**
     * MODALs
     */
    $scope.buscarProposicoes = function () {
    	
    	if($scope.reuniao.data == null){
    		alert('Selecione a data da reunião')
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
            }            
          }
        });
        
        modalInstance.result.then(function (listaEncaminhamentoProposicao) {
        	$scope.selectedProposicao.listaEncaminhamentoProposicao = listaEncaminhamentoProposicao;
          }, function () {
        	  //when modal is dismissed
        	  //o certo era receber a lista como parametro, mas no dismiss nao consegui passar parametro, 
        	  //entao carrego a lista de novo para atualizar a qtde
          	$scope.selectedProposicao.listaEncaminhamentoProposicao = EncaminhamentoProposicaoResource.findByProposicao({ProposicaoId: $scope.selectedProposicao.id});
            $log.info('Modal dismissed at: ' + new Date());
          });
    };
        
    
    
    
    /**
     * auto save when data is changed
     */
    var timeout = null;
    var debounceSaveUpdates = function(newVal, oldVal) {
      if (newVal != oldVal) {
        if (timeout) {
          $timeout.cancel(timeout)
        }
        $rootScope.inativeSpinner = true;
        timeout = $timeout($scope.save, 1000);  // 1000 = 1 second
      }
    };
    $scope.$watch('selectedProposicao.posicionamento', debounceSaveUpdates);
    $scope.$watchCollection('selectedProposicao.tags', debounceSaveUpdates);
    
    
    $scope.isClean = function() {
        return angular.equals(self.original, $scope.reuniao);
    };

    $scope.save = function() {
        var successCallback = function(){
            addAlert({type: 'success', msg: 'Registro atualizado com sucesso. (salvamento automático)'});
        	$rootScope.inativeSpinner = false;
        };
        var errorCallback = function() {
        };
        $scope.selectedProposicao.$update(successCallback, errorCallback);
    };

    $scope.remove = function() {
        alert($scope.reuniao.id);
        ReuniaoResource.remove({ReuniaoId:$scope.reuniao.id})
    };
    
    //TODO o que isso faz? @author guilherme.hott
    $scope.listaProposicaoSelection = $scope.listaProposicaoSelection || [];
    $scope.$watch("listaProposicaoSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.reuniao) {
            $scope.reuniao.listaReuniaoProposicoes = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.reuniao.listaReuniaoProposicoes.push(collectionItem);
            });
        }
    });
    
    $scope.getProposicao = function(id) {

        var successCallback = function(data){
        	$scope.selectedProposicao = data;
        	$scope.listaEncaminhamentoProposicao = EncaminhamentoProposicaoResource.findByProposicao({ProposicaoId: id});
            $scope.displayError = false;
        };
        var errorCallback = function(error) {
            $scope.displayError=true;
        };
        
    	ProposicaoResource.get({ProposicaoId: id}, successCallback, errorCallback);
    	$scope.posicionamentos = PosicionamentoResource.queryAll();
    	$scope.detalhamentoProposicao = true;
    }
    
    $scope.removerProposicao = function(id){
    	if(confirm("Deseja realmente excluir esse registro?")){
        	ProposicaoResource.remove({ProposicaoId: id})
        	$scope.listaProposicao = [];
        	$scope.selectedProposicao = null;
        	$scope.listaReuniaoProposicoes = ReuniaoResource.buscarReuniaoPorData({data : $scope.dataFormatada()});
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
                	alert('Não existem proposições para esta data. Você pode adicionar novas proposições.');
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
