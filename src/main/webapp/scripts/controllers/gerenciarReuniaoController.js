

angular.module('sislegisapp').controller('GerenciarReuniaoController', function($scope, $http, $routeParams, $location, $modal, $log, ReuniaoResource, ProposicaoResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.reuniao = new ReuniaoResource();
    
    $scope.open = function () {

        var modalInstance = $modal.open({
          templateUrl: 'views/modal-buscar-proposicao.html',
          controller: 'ModalBuscarProposicaoController',
          size: 'lg',
          resolve: {
            dataReuniao: function () {
              return $scope.reuniao.data;
            },
            listaProposicaoSelecao: function (){
            	return $scope.reuniao.listaProposicao;
            }
          }
        });
        
        modalInstance.result.then(function (listaProposicaoSelecao) {
        	$scope.reuniao.listaProposicao = listaProposicaoSelecao;
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });
    };
        
    /*$scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.reuniao = new ReuniaoResource(self.original);
            ProposicaoResource.queryAll(function(items) {
                $scope.listaProposicaoSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.reuniao.listaProposicao){
                        $.each($scope.reuniao.listaProposicao, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.listaProposicaoSelection.push(labelObject);
                                $scope.reuniao.listaProposicao.push(wrappedObject);
                            }
                        });
                        self.original.listaProposicao = $scope.reuniao.listaProposicao;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Reuniaos");
        };
        ReuniaoResource.get({ReuniaoId:$routeParams.ReuniaoId}, successCallback, errorCallback);
    };*/

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
    
    $scope.$watch("reuniao.data", function() {
    	var curr_date = $scope.reuniao.data.getDate();
        var curr_month = ('0' + ($scope.reuniao.data.getMonth()+1)).slice(-2); // Adicionando o 0 manualmente quando o mes tem apenas 1 digito
        var curr_year = $scope.reuniao.data.getFullYear();
        var formattedDate = curr_year + "" + curr_month + "" + curr_date;

		$http({
		  method:'GET',
		  url : "rest/reuniaos/findByData",
	  	  params: {
	  		  'data' : formattedDate
		  }
		})
		.success(function (data) {
			$scope.reuniao = data;
		    $scope.reuniao.listaProposicao = data.listaProposicao;
	    })
	    .error(function (data) {
			alert('Nenhuma reunião encontrada na data');
		});
    });
    
   // $scope.get();
    
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
