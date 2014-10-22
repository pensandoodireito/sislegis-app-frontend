

angular.module('sislegisapp').controller('MontarReuniaoController', function($scope, $routeParams, $location, $modal, $log, ReuniaoResource, ProposicaoResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.items = ['item1', 'item2', 'item3'];
    
    $scope.open = function (size) {

        var modalInstance = $modal.open({
          templateUrl: 'modal-buscar-proposicao.html',
          controller: 'ModalBuscarProposicaoController',
          size: size,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });
        
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });
    };
        
    $scope.get = function() {
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

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Reuniaos");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.reuniao.$remove(successCallback, errorCallback);
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
    
    
    $scope.get();
});