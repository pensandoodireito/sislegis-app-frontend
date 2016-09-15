angular.module('sislegisapp')

    .controller('SearchAreaMeritoController', function ($scope, $http, AreaMeritoResource) {

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

        $scope.performSearch = function () {
            $scope.searchResults = AreaMeritoResource.query(function () {
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
    }).controller('EditAreaMeritoController', function ($scope, $routeParams, $location, locationParser, AreaMeritoResource, BACKEND, UsuarioResource, toaster, $confirm) {
        var self = this;
        $scope.disabled = false;
        $scope.$location = $location;
        $scope.getUsuarios = function (val, buscaGeral) {
            var method = (buscaGeral) ? 'ldapSearch' : 'find';
            return UsuarioResource.buscaPorUsuario({ method: method, nome: val }, { method: method, nome: val },
                function (data) { },
                function (error) { toaster.pop('error', 'Falha ao buscar por contatos'); }).$promise;

        };
        $scope.isNew = false;
        $scope.get = function () {
            var successCallback = function (data) {
                self.original = data;
                $scope.area = new AreaMeritoResource(self.original);
            };
            var errorCallback = function () {
                $location.path("/AreaDeMerito");
            };
            if ($routeParams.id == null) {
                $scope.isNew = true;
            } else {
                AreaMeritoResource.get({ id: $routeParams.id }, successCallback, errorCallback);
            }
        };

        $scope.isClean = function () {
            return angular.equals(self.original, $scope.area);
        };

        $scope.save = function () {
            if ($scope.area.contato.id == null) {
                toaster.pop('error', 'Um usuário deve ser selecionado/criado para ser o contato dessa Área de Mérito');
                return;
            }
            var successCallback = function (data, responseHeaders) {
                if ($scope.isNew) {
                    var id = locationParser(responseHeaders);
                    $location.path('/AreaDeMerito/edit/' + id);
                } else {
                    $scope.get();
                    $scope.displayError = false;
                }
            };
            var errorCallback = function () {
                $scope.displayError = true;
            };
            if ($scope.isNew) {
                $scope.area = new AreaMeritoResource($scope.area);
                $scope.area.$save(successCallback, errorCallback);
                // AreaMeritoResource.save($scope.area, successCallback, errorCallback);
            } else {
                $scope.area.$save(successCallback, errorCallback);
            }
        };

        $scope.cancel = function () {
            $location.path("/AreaDeMerito");
        };

        $scope.remove = function () {

            var successCallback = function () {
                $location.path("/AreaDeMerito");
                $scope.displayError = false;
            };
            var errorCallback = function () {
                $scope.displayError = true;
            };
            var removeIt = function () {
                $scope.area.$remove(successCallback, errorCallback);
            }
            $confirm({ text: 'Deseja realmente apagar essa área de mérito? Qualquer parecer associado a ela será apagado.', title: 'Apagar área de mérito', ok: 'Sim', cancel: 'Não' })
                .then(removeIt);
        };


        $scope.get();
    });