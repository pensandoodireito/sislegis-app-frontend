

angular.module('sislegisapp').controller('EditPosicionamentoController', function($scope, $routeParams, $location, PosicionamentoResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.posicionamento = new PosicionamentoResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/Posicionamentos");
        };
        PosicionamentoResource.get({PosicionamentoId:$routeParams.PosicionamentoId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.posicionamento);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.posicionamento.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Posicionamentos");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Posicionamentos");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.posicionamento.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});