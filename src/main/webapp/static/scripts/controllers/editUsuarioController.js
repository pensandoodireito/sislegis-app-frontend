

angular.module('sislegisapp').controller('EditUsuarioController', function($scope, $routeParams, $location, UsuarioResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.usuario = new UsuarioResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/Usuarios");
        };
        UsuarioResource.get({UsuarioId:$routeParams.UsuarioId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.usuario);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.usuario.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Usuarios");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Usuarios");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.usuario.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});