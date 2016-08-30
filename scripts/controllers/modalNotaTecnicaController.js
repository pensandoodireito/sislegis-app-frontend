angular.module('sislegisapp').controller('ModalNotaTecnicaController',
    function ($scope, $http, $filter, $routeParams, $location, toaster, $modalInstance, proposicao, ComentarioResource,
        ProposicaoResource, UsuarioResource, ComentarioService) {

        var self = this;

        $scope.proposicao = proposicao || new ProposicaoResource();



        $scope.nota = {

        };
        $scope.notaForm = false;
        $scope.showNotaForm = function (b) {
            $scope.notaForm = b
        }

        $scope.editNota = function (nota) {
            $scope.notaForm = true;
            $scope.nota = nota;

        };
        $scope.novaNota = function () {
            $scope.notaForm = true;
            $scope.nota = {

            };
        };
        $scope.ok = function () {
            $modalInstance.close($scope.proposicao.listaNotas);
        };

        $scope.cancel = function () {
            if ($scope.notaForm == true) {
                $scope.notaForm = false;
            } else {

                $modalInstance.dismiss('cancel');
            }
        };
        $scope.save = function () {
            var successCallback = function (data, responseHeaders) {
                var found = false;
                for (var index = 0; index < $scope.proposicao.listaNotas.length; index++) {
                    var element = $scope.proposicao.listaNotas[index];
                    if (element.id == data.id) {
                        element = data;
                        found = true;
                        break;
                    }

                }
                if (!found) {
                    $scope.proposicao.listaNotas.push(data);
                }
                toaster.pop('success', 'Nota inserida com sucesso');
                $scope.notaForm = false;
            };

            var errorCallback = function () {
                toaster.pop('error', 'Falha ao tentar salvar nota técnica.');
            };

            ProposicaoResource.salvaNota({ ProposicaoId: $scope.proposicao.id }, $scope.nota, successCallback, errorCallback);
        };


    });