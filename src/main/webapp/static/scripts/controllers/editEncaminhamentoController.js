

angular.module('sislegisapp').controller('EditEncaminhamentoController', function($scope, $routeParams, $location, EncaminhamentoResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.encaminhamento = new EncaminhamentoResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/Encaminhamentos");
        };
        EncaminhamentoResource.get({EncaminhamentoId:$routeParams.EncaminhamentoId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.encaminhamento);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.encaminhamento.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Encaminhamentos");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Encaminhamentos");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.encaminhamento.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});