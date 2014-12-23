
angular.module('sislegisapp').controller('NewOrgaoController', function ($scope, $location, locationParser, OrgaoResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.orgao = $scope.orgao || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Orgaos/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        OrgaoResource.save($scope.orgao, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Orgaos");
    };
});