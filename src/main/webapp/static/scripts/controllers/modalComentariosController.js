angular.module('sislegisapp').controller('ModalComentariosController',
		function($scope, $http, $filter, $routeParams, $location, $modalInstance, proposicao, ComentarioResource, ProposicaoResource, UsuarioResource) {

			var self = this;
			$scope.disabled = false;
			$scope.showDetalhamentoComentario = false;
			$scope.$location = $location;

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
		        	alert('Comentário atualizado com sucesso');
		            $scope.displayError = false;
		        };
		        var errorCallback = function() {
		            $scope.displayError=true;
		        };
		        ComentarioResource.update($scope.comentario, successCallback, errorCallback);
		    };
		    

		    $scope.save = function() {
		    	
		        var successCallback = function(data,responseHeaders){
		        	$scope.comentario = new ComentarioResource();
		        	var id = $scope.proposicao.id;
		        	$scope.proposicao = ProposicaoResource.get({ProposicaoId: id});
		        	alert('Comentário adicionado com sucesso');
		            $scope.displayError = false;
		        };
		        var errorCallback = function() {
		            $scope.displayError = true;
		        };
		        

		    	//TODO mock
		    	UsuarioResource.queryAll(function(data){
		    		if(data.length > 0){
		    			$scope.comentario.autor = data[0];
		    		}
		    		$scope.comentario.dataCriacao = new Date();
		    		$scope.comentario.idProposicao = $scope.proposicao.id;
		    		
		    		$scope.comentario.$save(successCallback, errorCallback);
		    	});
		    };


		});