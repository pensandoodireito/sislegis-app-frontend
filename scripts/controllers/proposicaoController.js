angular.module('sislegisapp').controller('ProposicaoController', function ($scope, $rootScope, $http, $filter, $routeParams, $location, $modal, $log, $timeout, toaster,
                                                                           ProposicaoResource, ComentarioResource, PosicionamentoResource, EncaminhamentoProposicaoResource, BACKEND) {

    $scope.get = function () {
        var successCallback = function (data) {
            self.original = data;
            $scope.proposicao = new ProposicaoResource(self.original);
            $scope.proposicao.comentarios = ComentarioResource.findByProposicao({ProposicaoId: $scope.proposicao.id});
            $scope.proposicao.historicoPosicionamentos = PosicionamentoResource.historicoPosicionamentos({ProposicaoId: $scope.proposicao.id});
            $scope.proposicao.encaminhamentos = EncaminhamentoProposicaoResource.findByProposicao({ProposicaoId: $scope.proposicao.id});

        };
        var errorCallback = function () {
            $location.path("/");
        };
        ProposicaoResource.get({ProposicaoId: $routeParams.ProposicaoId}, successCallback, errorCallback);
    };

    $scope.get();

});
