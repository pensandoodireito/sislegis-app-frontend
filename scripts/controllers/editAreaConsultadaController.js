

angular.module('sislegisapp').controller('EditAreaConsultadaController', function($scope, $routeParams, $location, AreaConsultadaResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.areaConsultada = new AreaConsultadaResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/AreaConsultadas");
        };
        AreaConsultadaResource.get({AreaConsultadaId:$routeParams.AreaConsultadaId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.areaConsultada);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.areaConsultada.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/AreaConsultadas");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/AreaConsultadas");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.areaConsultada.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});