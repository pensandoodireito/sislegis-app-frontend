angular.module('sislegisapp').controller('ModalComentariosController',
		function($scope, $http, $filter, $routeParams, $location, $modalInstance, proposicao, listaComentario, ComentarioResource, ProposicaoResource) {

			var self = this;
			$scope.disabled = false;
			$scope.showDetalhamentoComentario = false;
			$scope.$location = $location;

			$scope.proposicao = proposicao || new ProposicaoResource();
			$scope.listaComentario = listaComentario || [];
		    $scope.comentario = $scope.comentario || new ComentarioResource();

			$scope.ok = function() {
				$modalInstance.close($scope.listaComentario);
			};

			$scope.cancel = function() {
				$modalInstance.dismiss('cancel');
			};

		    $scope.isClean = function() {
		        return angular.equals(self.original, $scope.comentario);
		    };

		    $scope.openUpdate = function(item) {
		        $scope.comentario = item;
		    };
		    
		    $scope.update = function() {
		        var successCallback = function(){
		        	$scope.comentario = new ComentarioResource();
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
		        	$scope.comentario = new ComentarioResource();
		            $scope.displayError = false;
		        };
		        var errorCallback = function() {
		            $scope.displayError = true;
		        };
		        ComentarioResource.save($scope.comentario, successCallback, errorCallback);
		    };


		});