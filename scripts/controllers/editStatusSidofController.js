

angular.module('sislegisapp').controller('EditStatusSidofController', function($scope, $routeParams, $location, StatusSidofResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.statusSidof = new StatusSidofResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/StatusSidof");
        };
        StatusSidofResource.get({StatusSidofId:$routeParams.StatusSidofId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.statusSidof);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.statusSidof.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/StatusSidof");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/StatusSidof");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.statusSidof.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});