angular.module('sislegisapp').controller('ModalEncaminhamentosController',
		function($scope, $rootScope, $http, $filter, $routeParams, $location, $modalInstance, toaster, proposicao, EncaminhamentoResource, 
				ProposicaoResource, EncaminhamentoProposicaoResource, UsuarioResource, ComentarioResource, BACKEND) {

			var self = this;
			$scope.disabled = false;
			$scope.$location = $location;

			$scope.proposicao = proposicao || new ProposicaoResource();
		    $scope.encaminhamento = new EncaminhamentoResource();
		    $scope.encaminhamentoProposicao = new EncaminhamentoProposicaoResource();
			$scope.listaEncaminhamento = EncaminhamentoResource.queryAll() || [];
			
			$scope.getUsuarios = function(val) {
			    return $http.get(BACKEND + '/usuarios/find', {
			      params: {
			        nome: val
			      }
			    }).then(function(response){
			      return response.data.map(function(item){
			        return item;
			      });
			    });
			  };

			$scope.ok = function() {
				$modalInstance.close($scope.proposicao);
			};

			$scope.cancel = function() {
				$modalInstance.dismiss('cancel');
			};

		    $scope.isClean = function() {
		        return angular.equals(self.original, $scope.encaminhamentoProposicao);
		    };

		    $scope.openUpdate = function(item) {
		        $scope.encaminhamentoProposicao = new EncaminhamentoProposicaoResource(item);
		    };
		    
		    $scope.update = function() {
		    	$scope.encaminhamentoProposicao.proposicao = new ProposicaoResource();
		    	$scope.encaminhamentoProposicao.proposicao.id = $scope.proposicao.id;
		    	
		        var successCallback = function(){
		        	EncaminhamentoProposicaoResource.findByProposicao({ProposicaoId: $scope.proposicao.id},function(data) {
						$scope.proposicao.listaEncaminhamentoProposicao = data;
						$scope.encaminhamentoProposicao = new EncaminhamentoProposicaoResource();
						$scope.encaminhamento = new EncaminhamentoResource();
						toaster.pop('success', 'Encaminhamento atualizado com sucesso');
					});
		        };
		        var errorCallback = function() {
		        	$scope.encaminhamentoProposicao = new EncaminhamentoProposicaoResource();
		        	toaster.pop('error', 'Falha ao realizar operação.');
		        };
		        $scope.encaminhamentoProposicao.$update({EncaminhamentoProposicaoId: $scope.encaminhamentoProposicao.id}, successCallback, errorCallback);
		    };
		    

		    $scope.save = function() {
		    	
		    	$scope.encaminhamentoProposicao.proposicao = new ProposicaoResource();
		    	$scope.encaminhamentoProposicao.proposicao.id = $scope.proposicao.id;
		    	if(!$scope.encaminhamentoProposicao.comentario){
		    		$scope.encaminhamentoProposicao.comentario = new ComentarioResource();
		    	}
		    	$scope.encaminhamentoProposicao.dataHoraLimite = $scope.encaminhamentoProposicao.dataHoraLimite.getTime();
		    	$scope.encaminhamentoProposicao.comentario.dataCriacao = new Date().getTime();
		    	
		    	//TODO pegar usuario logado
		    	$scope.encaminhamentoProposicao.comentario.autor = $scope.encaminhamentoProposicao.responsavel;
		    	
		        var successCallback = function(data,responseHeaders){
					EncaminhamentoProposicaoResource.findByProposicao({ProposicaoId: $scope.proposicao.id},function(data) {
						$scope.proposicao.listaEncaminhamentoProposicao = data;
						$scope.proposicao.totalEncaminhamentos++;
						$scope.encaminhamentoProposicao = new EncaminhamentoProposicaoResource();
						$scope.encaminhamento = new EncaminhamentoResource();
				    	$rootScope.$emit('updateTarefas');
						toaster.pop('success', 'Encaminhamento inserido com sucesso');
					});
		        };
		        var errorCallback = function() {
		        	toaster.pop('error', 'Falha ao realizar operação.');
		        };
		        EncaminhamentoProposicaoResource.save($scope.encaminhamentoProposicao, successCallback, errorCallback);
		    };

		    // CALENDARIO
		    $scope.setCalendar = function() {
				$scope.openCalendar = function($event) {
					$event.preventDefault();
					$event.stopPropagation();
			
					$scope.opened = true;
				};

				$scope.dateOptions = {
					formatYear : 'yy',
					startingDay : 1
				};

				$scope.format = 'dd/MM/yyyy';
		    }
		    
		    $scope.setCalendar();

		});
