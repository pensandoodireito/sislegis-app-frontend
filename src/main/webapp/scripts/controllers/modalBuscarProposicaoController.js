

angular.module('sislegisapp').controller('ModalBuscarProposicaoController', function($scope, $routeParams, $location, $modalInstance, ProposicaoResource, items) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
});