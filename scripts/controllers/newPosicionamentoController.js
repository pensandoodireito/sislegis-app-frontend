angular.module('sislegisapp').controller('NewPosicionamentoController', function ($scope, $location, locationParser, PosicionamentoResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.simpleEntity = $scope.simpleEntity || {};

    $scope.title = "Posicionamento";

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Posicionamentos/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        PosicionamentoResource.save($scope.simpleEntity, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Posicionamentos");
    };
});