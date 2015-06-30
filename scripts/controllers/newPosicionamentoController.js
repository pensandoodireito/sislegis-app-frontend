
angular.module('sislegisapp').controller('NewPosicionamentoController', function ($scope, $location, locationParser, PosicionamentoResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.posicionamento = $scope.posicionamento || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Posicionamentos/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        PosicionamentoResource.save($scope.posicionamento, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Posicionamentos");
    };
});