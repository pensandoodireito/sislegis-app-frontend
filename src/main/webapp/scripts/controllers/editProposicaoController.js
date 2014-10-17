

angular.module('sislegisapp').controller('EditProposicaoController', function($scope, $routeParams, $location, ProposicaoResource , ReuniaoResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.proposicao = new ProposicaoResource(self.original);
            ReuniaoResource.queryAll(function(items) {
                $scope.listaReuniaoSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.proposicao.listaReuniao){
                        $.each($scope.proposicao.listaReuniao, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.listaReuniaoSelection.push(labelObject);
                                $scope.proposicao.listaReuniao.push(wrappedObject);
                            }
                        });
                        self.original.listaReuniao = $scope.proposicao.listaReuniao;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Proposicaos");
        };
        ProposicaoResource.get({ProposicaoId:$routeParams.ProposicaoId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.proposicao);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.proposicao.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Proposicaos");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Proposicaos");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.proposicao.$remove(successCallback, errorCallback);
    };
    
    $scope.listaReuniaoSelection = $scope.listaReuniaoSelection || [];
    $scope.$watch("listaReuniaoSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.proposicao) {
            $scope.proposicao.listaReuniao = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.proposicao.listaReuniao.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});