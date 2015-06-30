angular.module('sislegisapp').controller('ModalComentariosController',
		function($scope, $http, $filter, $routeParams, $location, toaster, $modalInstance, proposicao, ComentarioResource, 
				ProposicaoResource, UsuarioResource, ComentarioService) {

			var self = this;

			$scope.proposicao = proposicao || new ProposicaoResource();
		    $scope.comentario = $scope.comentario || new ComentarioResource();

			$scope.ok = function() {
				$modalInstance.close($scope.proposicao.listaComentario);
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
		        	toaster.pop('success', 'Comentário atualizado com sucesso');
		        };
		        var errorCallback = function() {
		        	toaster.pop('error', 'Falha ao realizar operação.');
		        };
		        ComentarioResource.update($scope.comentario, successCallback, errorCallback);
		    };
		    

		    $scope.save = function() {
		    	
		        var successCallback = function(data,responseHeaders){
		        	$scope.comentario = new ComentarioResource();
		        	var id = $scope.proposicao.id;
		        	$scope.proposicao = ProposicaoResource.get({ProposicaoId: id});
		        	toaster.pop('success', 'Comentário inserido com sucesso');
		        };
		        var errorCallback = function() {
		        	toaster.pop('error', 'Falha ao realizar operação.');
		        };
		        

	    		ComentarioService.save($scope.comentario, $scope.proposicao.id).then(successCallback, errorCallback);
		    };


		});