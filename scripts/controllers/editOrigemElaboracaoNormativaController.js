

angular.module('sislegisapp').controller('EditOrigemElaboracaoNormativaController', function($scope, $routeParams, $location, OrigemElaboracaoNormativaResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.origemElaboracaoNormativa = new OrigemElaboracaoNormativaResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/OrigemElaboracaoNormativas");
        };
        OrigemElaboracaoNormativaResource.get({OrigemElaboracaoNormativaId:$routeParams.OrigemElaboracaoNormativaId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.origemElaboracaoNormativa);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.origemElaboracaoNormativa.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/OrigemElaboracaoNormativas");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/OrigemElaboracaoNormativas");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.origemElaboracaoNormativa.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});