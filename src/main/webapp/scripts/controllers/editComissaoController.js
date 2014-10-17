

angular.module('sislegisapp').controller('EditComissaoController', function($scope, $routeParams, $location, ComissaoResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.comissao = new ComissaoResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/Comissaos");
        };
        ComissaoResource.get({ComissaoId:$routeParams.ComissaoId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.comissao);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.comissao.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Comissaos");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Comissaos");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.comissao.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});