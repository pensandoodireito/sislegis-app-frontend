
angular.module('sislegisapp').controller('NewOrigemElaboracaoNormativaController', function ($scope, $location, locationParser, OrigemElaboracaoNormativaResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.origemElaboracaoNormativa = $scope.origemElaboracaoNormativa || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/OrigemElaboracaoNormativas/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        OrigemElaboracaoNormativaResource.save($scope.origemElaboracaoNormativa, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/OrigemElaboracaoNormativas");
    };
});