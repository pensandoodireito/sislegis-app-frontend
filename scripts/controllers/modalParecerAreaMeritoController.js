angular.module('sislegisapp').controller('ModalParecerAreaMeritoController',
    function ($scope, $http, $filter, $routeParams, $location, toaster, $modalInstance, proposicao, ComentarioResource,
        ProposicaoResource, UsuarioResource, ComentarioService, PosicionamentoResource) {

        var self = this;
        $scope.areaMeritos = ProposicaoResource.listaAreaMerito();

        $scope.revisao = {
            proposicao: proposicao
        }
        $scope.posicionamentos = PosicionamentoResource.query();



       

        $scope.cancel = function () {


            $modalInstance.dismiss('cancel');

        };
        $scope.save = function () {
            var successCallback = function (data, responseHeaders) {

                if ($scope.revisao.proposicao.revisoes == null) {
                    $scope.revisao.proposicao.revisoes = [];
                }
                $scope.revisao.proposicao.revisoes.push(data);

                toaster.pop('success', 'Parecer inserido com sucesso');
                $modalInstance.close($scope.revisao.proposicao);
            };

            var errorCallback = function () {
                toaster.pop('error', 'Falha ao tentar salvar parecer.');
            };

            ProposicaoResource.salvarRevisao({ ProposicaoId: $scope.revisao.proposicao.id }, $scope.revisao, successCallback, errorCallback);
        };


    });