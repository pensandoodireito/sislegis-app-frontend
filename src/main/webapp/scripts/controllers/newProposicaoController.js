
angular.module('sislegisapp').controller('NewProposicaoController', function ($scope, $location, locationParser, ProposicaoResource , ReuniaoResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.proposicao = $scope.proposicao || {};
    
    $scope.listaReuniaoList = ReuniaoResource.queryAll(function(items){
        $scope.listaReuniaoSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("listaReuniaoSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.proposicao.listaReuniao = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.proposicao.listaReuniao.push(collectionItem);
            });
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Proposicaos/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        ProposicaoResource.save($scope.proposicao, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Proposicaos");
    };
});