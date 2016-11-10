

angular.module('sislegisapp').controller('EditUsuarioController', function ($scope, $routeParams, $location, UsuarioResource, $confirm) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;

    $scope.get = function () {
        var successCallback = function (data) {
            self.original = data;
            $scope.usuario = new UsuarioResource(self.original);
        };
        var errorCallback = function () {
            $location.path("/Usuarios");
        };
        UsuarioResource.get({ UsuarioId: $routeParams.UsuarioId }, successCallback, errorCallback);
    };

    $scope.isClean = function () {
        return angular.equals(self.original, $scope.usuario);
    };

    $scope.save = function () {
        var successCallback = function () {
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function () {
            $scope.displayError = true;
        };
        $scope.usuario.$update(successCallback, errorCallback);
    };

    $scope.cancel = function () {
        $location.path("/Usuarios");
    };
    $scope.removeForce = function () {
        var successCallback = function () {
            $location.path("/Usuarios");
            $scope.displayError = false;
        };
        var errorCallback = function () {
            $scope.displayError = true;
        };

        UsuarioResource.remove({ f: true }, $scope.usuario, successCallback, errorCallback);

    }
    $scope.remove = function () {
        var successCallback = function () {
            $location.path("/Usuarios");
            $scope.displayError = false;
        };
        var errorCallback = function () {
            $confirm({ text: 'Este usuário deve possuir entidades relacionadas (responsável por proposição, autor de comentários etc) deseja realmente apagar esse usuário?', title: 'Apagar Usuário', ok: 'Sim', cancel: 'Não' })
                .then($scope.removeForce);
            $scope.displayError = true;
        };

        $scope.usuario.$remove(successCallback, errorCallback);

    };


    $scope.get();
});