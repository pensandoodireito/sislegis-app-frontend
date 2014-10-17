
angular.module('sislegisapp').controller('NewComissaoController', function ($scope, $location, locationParser, ComissaoResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.comissao = $scope.comissao || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Comissaos/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        ComissaoResource.save($scope.comissao, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Comissaos");
    };
});