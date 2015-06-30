angular.module('sislegisapp').controller('EditOrgaoController', function($scope, $routeParams, $location, OrgaoResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.orgao = new OrgaoResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/Orgaos");
        };
        OrgaoResource.get({OrgaoId:$routeParams.OrgaoId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.orgao);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.orgao.$update(successCallback, errorCallback);
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
        $scope.orgao.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});