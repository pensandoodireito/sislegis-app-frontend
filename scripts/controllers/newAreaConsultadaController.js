
angular.module('sislegisapp').controller('NewAreaConsultadaController', function ($scope, $location, locationParser, AreaConsultadaResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.areaConsultada = $scope.areaConsultada || {};
    

    $scope.save = function() {
        var successCallback = function(data, status, responseHeaders, config){
            var id = locationParser(responseHeaders);
            $location.path('/AreaConsultadas/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        AreaConsultadaResource.save($scope.areaConsultada, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/AreaConsultadas");
    };
});