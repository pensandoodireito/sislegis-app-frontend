
angular.module('sislegisapp').controller('NewEncaminhamentoController', function ($scope, $location, locationParser, EncaminhamentoResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.encaminhamento = $scope.encaminhamento || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Encaminhamentos/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        EncaminhamentoResource.save($scope.encaminhamento, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Encaminhamentos");
    };
});