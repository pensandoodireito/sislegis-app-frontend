angular.module('sislegisapp').controller('EditOrgaoController', function($scope, $routeParams, $location, OrgaoResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.title = "Orgão";
    $scope.isNew = false;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.simpleEntity = new OrgaoResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/Orgaos");
        };
        OrgaoResource.get({OrgaoId:$routeParams.OrgaoId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.simpleEntity);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.simpleEntity.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Orgaos");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Orgaos");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.simpleEntity.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});