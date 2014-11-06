angular.module('sislegisapp').controller('ModalEncaminhamentoController',
		function($scope, $http, $filter, $routeParams, $location, $modalInstance, proposicao, EncaminhamentoResource, ProposicaoResource) {

			var self = this;
			$scope.disabled = false;
			$scope.$location = $location;

			$scope.proposicao = proposicao || new ProposicaoResource();
		    $scope.encaminhamento = $scope.encaminhamento || new EncaminhamentoResource();

			$scope.ok = function() {
				$modalInstance.close();
			};

			$scope.cancel = function() {
				$modalInstance.dismiss('cancel');
			};

		    $scope.isClean = function() {
		        return angular.equals(self.original, $scope.encaminhamento);
		    };

		    $scope.openUpdate = function(item) {
		        $scope.encaminhamento = item;
		    };
		    
		    $scope.update = function() {
		        var successCallback = function(){
		        	$scope.encaminhamento = new EncaminhamentoResource();
		            $scope.displayError = false;
		        };
		        var errorCallback = function() {
		            $scope.displayError=true;
		        };
		        $scope.encaminhamento.$update(successCallback, errorCallback);
		    };
		    

		    $scope.save = function() {
		    	
		    	$scope.encaminhamento.dataCriacao = new Date();
		    	$scope.encaminhamento.proposicao = new ProposicaoResource();
		    	$scope.encaminhamento.proposicao.id = $scope.proposicao.id;
		    	//TODO mock
		    	$scope.encaminhamento.autor = 'usuario logado';
		    	
		        var successCallback = function(data,responseHeaders){
		        	$scope.listaEncaminhamento.push(data);
		        	$scope.encaminhamento = new EncaminhamentoResource();
		            $scope.displayError = false;
		        };
		        var errorCallback = function() {
		            $scope.displayError = true;
		        };
		        EncaminhamentoResource.save($scope.encaminhamento, successCallback, errorCallback);
		    };


		});