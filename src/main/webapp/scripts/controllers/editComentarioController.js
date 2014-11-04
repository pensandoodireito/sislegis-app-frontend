

angular.module('sislegisapp').controller('EditComentarioController', function($scope, $routeParams, $location, ComentarioResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.comentario = new ComentarioResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/Comentarios");
        };
        ComentarioResource.get({ComentarioId:$routeParams.ComentarioId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.comentario);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.comentario.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Comentarios");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Comentarios");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.comentario.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});