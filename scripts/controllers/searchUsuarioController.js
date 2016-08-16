

angular.module('sislegisapp').controller('SearchUsuarioController', function ($scope, $http, UsuarioResource, EquipeResource, Auth) {
    $scope.auth = Auth;

    $scope.search = {};
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.searchResults = [];
    $scope.filteredResults = [];
    $scope.pageRange = [];
    $scope.numberOfPages = function () {
        var result = Math.ceil($scope.filteredResults.length / $scope.pageSize);
        var max = (result == 0) ? 1 : result;
        $scope.pageRange = [];
        for (var ctr = 0; ctr < max; ctr++) {
            $scope.pageRange.push(ctr);
        }
        return max;
    };

    $scope.listaEquipe = EquipeResource.queryAll();
    $scope.hasRole = function (user, role) {
        for (var index = 0; index < user.papeis.length; index++) {
            var element = user.papeis[index];
            if (element == role) {
                return true;
            }

        }
        return false;
    }
    $scope.setRole = function (user, role) {
        var removing = false;
        for (var index = 0; index < user.papeis.length; index++) {
            var element = user.papeis[index];
            if (element == role) {

                user.papeis.splice(index, 1);
                removing = true;
                break;
            }
        }
        if (removing == false) {
            user.papeis.push(role);
        }
        UsuarioResource.update(user, function (ok) {

        }, function (error) {
            console.log("error", error);
        })

    }

    $scope.buscarPorEquipe = function () {
        if ($scope.equipeSelecionada) {
            angular.forEach($scope.listaEquipe, function (equipe) {
                if (equipe.id == $scope.equipeSelecionada) {
                    var listaUsuarios = [];
                    angular.forEach(equipe.listaEquipeUsuario, function (value) {
                        listaUsuarios.push(value.usuario);
                    });
                    $scope.searchResults = listaUsuarios;
                    $scope.numberOfPages();
                }
            });
        } else {
            $scope.performSearch();
        }
    }

    $scope.performSearch = function () {
        $scope.searchResults = UsuarioResource.queryAll(function () {
            $scope.numberOfPages();
        });
    };

    $scope.previous = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.next = function () {
        if ($scope.currentPage < ($scope.numberOfPages() - 1)) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function (n) {
        $scope.currentPage = n;
    };

    $scope.performSearch();
});