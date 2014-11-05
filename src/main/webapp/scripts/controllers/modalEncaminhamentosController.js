angular.module('sislegisapp').controller('ModalEncaminhamentosController',
		function($scope, $http, $filter, $routeParams, $location, $modalInstance, proposicao, listaEncaminhamentos, EncaminhamentoProposicaoResource, ProposicaoResource) {

			var self = this;
			$scope.disabled = false;
			$scope.showDetalhamentoComentario = false;
			$scope.$location = $location;

			$scope.proposicao = proposicao || new ProposicaoResource();
			$scope.listaEncaminhamentos = listaEncaminhamentos || [];
		    $scope.encaminhamentoProposicao = $scope.comentario || new EncaminhamentoProposicaoResource();

			$scope.ok = function() {
				$modalInstance.close($scope.listaComentario);
			};

			$scope.cancel = function() {
				$modalInstance.dismiss('cancel');
			};

		    $scope.isClean = function() {
		        return angular.equals(self.original, $scope.encaminhamentoProposicao);
		    };

		    $scope.openUpdate = function(item) {
		        $scope.encaminhamentoProposicao = item;
		    };
		    
		    $scope.update = function() {
		        var successCallback = function(){
		        	$scope.encaminhamentoProposicao = new EncaminhamentoProposicaoResource();
		            $scope.displayError = false;
		        };
		        var errorCallback = function() {
		            $scope.displayError=true;
		        };
		        $scope.comentario.$update(successCallback, errorCallback);
		    };
		    

		    $scope.save = function() {
		    	
		    	$scope.comentario.dataCriacao = new Date();
		    	$scope.comentario.proposicao = new ProposicaoResource();
		    	$scope.comentario.proposicao.id = $scope.proposicao.id;
		    	//TODO mock
		    	$scope.comentario.autor = 'usuario logado';
		    	
		        var successCallback = function(data,responseHeaders){
		        	$scope.listaComentario.push(data);
		        	$scope.encaminhamentoProposicao = new EncaminhamentoProposicaoResource();
		            $scope.displayError = false;
		        };
		        var errorCallback = function() {
		            $scope.displayError = true;
		        };
		        EncaminhamentoProposicaoResource.save($scope.comentario, successCallback, errorCallback);
		    };


		});