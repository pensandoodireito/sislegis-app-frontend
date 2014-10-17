
angular.module('sislegisapp').controller('NewReuniaoController', function ($scope, $location, locationParser, ReuniaoResource , ProposicaoResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.reuniao = $scope.reuniao || {};
    
    $scope.listaProposicaoList = ProposicaoResource.queryAll(function(items){
        $scope.listaProposicaoSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("listaProposicaoSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.reuniao.listaProposicao = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.reuniao.listaProposicao.push(collectionItem);
            });
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Reuniaos/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        ReuniaoResource.save($scope.reuniao, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Reuniaos");
    };
});