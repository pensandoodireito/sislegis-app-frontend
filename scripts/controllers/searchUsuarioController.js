

angular.module('sislegisapp').controller('SearchUsuarioController', function ($scope, $http, UsuarioResource, EquipeResource, Auth, $confirm) {
    $scope.auth = Auth;

    $scope.search = {};
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.searchResults = [];
    $scope.filteredResults = [];
    $scope.pageRange = [];
    $scope.numberOfPages = function () {
        var result = Math.ceil($scope.searchResults.length / $scope.pageSize);
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

        var updateIt = function () {
            UsuarioResource.update(user, function (ok) {

            }, function (error) {
                console.log("error", error);
            })
        }
        if (removing == false) {
            user.papeis.push(role);
        } else {
            if (role == "ADMIN" && user.email == $scope.auth.me.email) {
                $confirm({ text: 'Você está se removendo da função de administrador. Você tem certeza que deseja executar essa ação?', title: 'Remover papel admin', ok: 'Sim', cancel: 'Não' })
                    .then(updateIt, function () {
                        user.papeis.push("ADMIN");
                    });
                return;

            }
        }
        updateIt();



    }



    $scope.performSearch = function () {
        $scope.searchResults = UsuarioResource.queryAll(function () {
            console.log($scope.searchResults)
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