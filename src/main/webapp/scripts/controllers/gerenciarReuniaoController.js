

angular.module('sislegisapp').controller('GerenciarReuniaoController', function($scope, $http, $routeParams, $location, $modal, $log, ReuniaoResource, ProposicaoResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.reuniao = new ReuniaoResource();
    
    $scope.open = function () {
    	
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
            listaProposicaoSelecao: function (){
            	return $scope.reuniao.listaProposicao;
            }
          }
        });
        
        modalInstance.result.then(function (listaProposicaoSelecao) {
        	if(!$scope.reuniao.listaProposicao){
        		$scope.reuniao.listaProposicao = [];
        	}
        	$scope.listaProposicao = ReuniaoResource.buscarReuniaoPorData({data : $scope.dataFormatada()});
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });
    };
        

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.reuniao);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.reuniao.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Reuniaos");
    };
    
    $scope.close = function(){
    	alert('Teste');
    };
    

    $scope.remove = function() {
        /*var successCallback = function() {
            $location.path("/Reuniaos");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };*/
        alert($scope.reuniao.id);
        ReuniaoResource.remove({ReuniaoId:$scope.reuniao.id})
        //$scope.reuniao.$remove({ReuniaoId:$scope.reuniao.id}, successCallback, errorCallback); // TODO: testar
    };
    
    $scope.listaProposicaoSelection = $scope.listaProposicaoSelection || [];
    $scope.$watch("listaProposicaoSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.reuniao) {
            $scope.reuniao.listaProposicao = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.reuniao.listaProposicao.push(collectionItem);
            });
        }
    });
    
    $scope.getProposicao = function(id) {
    	$scope.selectedProposicao = ProposicaoResource.get({ProposicaoId: id});
    	
    }
    
    $scope.removerProposicao = function(id){
    	if(confirm("Deseja realmente excluir esse registro?")){
        	ProposicaoResource.remove({ProposicaoId: id})
        	$scope.listaProposicao = [];
        	$scope.selectedProposicao = null;
        	$scope.listaProposicao = ReuniaoResource.buscarReuniaoPorData({data : $scope.dataFormatada()});
    	}

    }; 
    
    
    $scope.dataFormatada = function(){
    	var curr_date = $scope.reuniao.data.getDate();
        var curr_month = ('0' + ($scope.reuniao.data.getMonth()+1)).slice(-2); // Adicionando o 0 manualmente quando o mes tem apenas 1 digito
        var curr_year = $scope.reuniao.data.getFullYear();
        return curr_year + "" + curr_month + "" + curr_date;
    };
    
    $scope.$watch("reuniao.data", function() {
        $scope.listaProposicao = ReuniaoResource.buscarReuniaoPorData({data : $scope.dataFormatada()});

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
