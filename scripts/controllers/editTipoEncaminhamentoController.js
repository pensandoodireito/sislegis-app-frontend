angular.module('sislegisapp').controller('EditTipoEncaminhamentoController', function ($scope, $routeParams, $location, TipoEncaminhamentoResource, $confirm) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;

    $scope.title = "Tipo Encaminhamento";
    $scope.isNew = false;

    $scope.get = function () {
        var successCallback = function (data) {
            self.original = data;
            $scope.simpleEntity = new TipoEncaminhamentoResource(self.original);
        };
        var errorCallback = function () {
            $location.path("/TipoEncaminhamentos");
        };
        TipoEncaminhamentoResource.get({ TipoEncaminhamentoId: $routeParams.TipoEncaminhamentoId }, successCallback, errorCallback);
    };

    $scope.isClean = function () {
        return angular.equals(self.original, $scope.simpleEntity);
    };

    $scope.save = function () {
        var successCallback = function () {
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function () {
            $scope.displayError = true;
        };
        $scope.simpleEntity.$update(successCallback, errorCallback);
    };

    $scope.cancel = function () {
        $location.path("/TipoEncaminhamentos");
    };

    $scope.remove = function () {
        var successCallback = function () {
            $location.path("/TipoEncaminhamentos");
            $scope.displayError = false;
        };
        var errorCallback = function () {
            $scope.displayError = true;
        };

        var removeIt = function () {
            $scope.simpleEntity.$remove(successCallback, errorCallback);
        }
        $confirm({ text: 'Deseja realmente apagar esse tipo de encaminhamento? Qualquer encaminhamento com esse tipo será apagado.', title: 'Apagar tipo encaminhamento', ok: 'Sim', cancel: 'Não' })
            .then(removeIt);
    };


    $scope.get();
});