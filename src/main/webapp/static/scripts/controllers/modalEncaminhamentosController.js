angular.module('sislegisapp').controller('ModalEncaminhamentosController',
		function($scope, $http, $filter, $routeParams, $location, $modalInstance, proposicao, listaEncaminhamentoProposicao, EncaminhamentoResource, ProposicaoResource, EncaminhamentoProposicaoResource) {

			var self = this;
			$scope.disabled = false;
			$scope.$location = $location;

			$scope.proposicao = proposicao || new ProposicaoResource();
		    $scope.encaminhamento = new EncaminhamentoResource();
		    $scope.encaminhamentoProposicao = new EncaminhamentoProposicaoResource();
			$scope.listaEncaminhamentoProposicao = listaEncaminhamentoProposicao || [];
			$scope.listaEncaminhamento = EncaminhamentoResource.queryAll() || [];
			
			$scope.teste = function(){
				console.log($scope.selectedObject);
				console.log($scope.encaminhamentoProposicao.responsavel);
			}

			$scope.ok = function() {
				$modalInstance.close($scope.listaEncaminhamentoProposicao);
			};

			$scope.cancel = function() {
	        	$scope.encaminhamentoProposicao = new EncaminhamentoProposicaoResource();
				$modalInstance.dismiss('cancel');
			};

		    $scope.isClean = function() {
		        return angular.equals(self.original, $scope.encaminhamentoProposicao);
		    };

		    $scope.openUpdate = function(item) {
		        $scope.encaminhamentoProposicao = item;
		    };
		    
		    $scope.update = function() {
		    	$scope.encaminhamentoProposicao.proposicao = new ProposicaoResource();
		    	$scope.encaminhamentoProposicao.proposicao.id = $scope.proposicao.id;
		    	
		        var successCallback = function(){
		        	$scope.encaminhamentoProposicao = new EncaminhamentoProposicaoResource();
		        	alert('Encaminhamento atualizado com sucesso');
		            $scope.displayError = false;
		        };
		        var errorCallback = function() {
		        	$scope.encaminhamentoProposicao = new EncaminhamentoProposicaoResource();
		            $scope.displayError=true;
		        };
		        $scope.encaminhamentoProposicao.$update({EncaminhamentoProposicaoId: $scope.encaminhamentoProposicao.id}, successCallback, errorCallback);
		    };
		    

		    $scope.save = function() {
		    	
		    	$scope.encaminhamentoProposicao.proposicao = new ProposicaoResource();
		    	$scope.encaminhamentoProposicao.proposicao.id = $scope.proposicao.id;
		    	$scope.encaminhamentoProposicao.comentario.dataCriacao = new Date();
		    	
		    	//TODO mock
		    	$scope.encaminhamentoProposicao.comentario.autor = 'usuario logado';
		    	
		        var successCallback = function(data,responseHeaders){
					$scope.listaEncaminhamentoProposicao = EncaminhamentoProposicaoResource.findByProposicao({ProposicaoId: $scope.proposicao.id});
		        	$scope.encaminhamentoProposicao = new EncaminhamentoProposicaoResource();
		        	$scope.encaminhamento = new EncaminhamentoResource();
		        	alert('Encaminhamento adicionado com sucesso');
		            $scope.displayError = false;
		        };
		        var errorCallback = function() {
		            $scope.displayError = true;
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