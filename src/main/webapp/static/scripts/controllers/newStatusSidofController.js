
angular.module('sislegisapp').controller('NewStatusSidofController', function ($scope, $location, locationParser, StatusSidofResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.statusSidof = $scope.statusSidof || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/StatusSidof/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        StatusSidofResource.save($scope.statusSidof, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/StatusSidof");
    };
});