angular.module('sislegisapp').controller('ModalNotaTecnicaController',
    function ($scope, $http, $filter, $routeParams, $location, toaster, $modalInstance, proposicao, ComentarioResource,
        ProposicaoResource, UsuarioResource, ComentarioService, $confirm) {

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
            $modalInstance.close($scope.proposicao);
        };

        $scope.cancel = function () {
            if ($scope.notaForm == true) {
                $scope.notaForm = false;
            } else {

                $modalInstance.dismiss('cancel');
            }
        };
        $scope.removeNota = function (nota) {
            var successCallback = function (data, responseHeaders) {

                for (var index = 0; index < $scope.proposicao.listaNotas.length; index++) {
                    var element = $scope.proposicao.listaNotas[index];
                    if (element.id == $scope.nota.id) {
                        $scope.proposicao.listaNotas.splice(index, 1);
                        break;
                    }
                }
                $scope.proposicao.totalNotasTecnicas = $scope.proposicao.listaNotas.length;
                toaster.pop('success', 'Nota removida com sucesso');
                $scope.notaForm = false;
            };

            var errorCallback = function () {
                toaster.pop('error', 'Falha ao tentar remove nota técnica.');
            };

            var removeIt = function () {
                ProposicaoResource.removeNota({ ProposicaoId: $scope.proposicao.id, notaId: $scope.nota.id }, successCallback, errorCallback);
            }

            $confirm({ text: 'Deseja realmente apagar essa nota técnica.', title: 'Apagar nota técnica', ok: 'Sim', cancel: 'Não' })
                .then(removeIt);

        }
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
                $scope.proposicao.totalNotasTecnicas = $scope.proposicao.listaNotas.length;
                toaster.pop('success', 'Nota inserida com sucesso');
                $scope.notaForm = false;
            };

            var errorCallback = function () {
                toaster.pop('error', 'Falha ao tentar salvar nota técnica.');
            };

            ProposicaoResource.salvaNota({ ProposicaoId: $scope.proposicao.id }, $scope.nota, successCallback, errorCallback);
        };


    });