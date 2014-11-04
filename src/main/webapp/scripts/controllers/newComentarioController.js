
angular.module('sislegisapp').controller('NewComentarioController', function ($scope, $location, locationParser, ComentarioResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.comentario = $scope.comentario || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Comentarios/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        ComentarioResource.save($scope.comentario, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Comentarios");
    };
});