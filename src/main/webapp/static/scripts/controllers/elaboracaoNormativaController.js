angular.module('sislegisapp').controller('ElaboracaoNormativaController',
		function($scope, $http, $routeParams, $location, $locale, ElaboracaoNormativaResource, EquipeResource, FileUploader, TagResource) {
			var self = this;
			$scope.disabled = false;
		    $scope.$location = $location;
			$scope.elaboracaoNormativa = $scope.elaboracaoNormativa || {};//new ElaboracaoNormativaResource();
			$scope.equipes = EquipeResource.queryAll();
			
		    $scope.loadTags = function(query) {
		    	return TagResource.listarTodos().$promise;
		    }; 
			
			$scope.elaboracaoNormativa.listaElaboracaoNormativaConsulta = [];
			
			
		    $scope.tipos = ElaboracaoNormativaResource.tipos();
		    
		    $scope.identificacoes = ElaboracaoNormativaResource.identificacoes();
		    
		    // inicio config upload
			$scope.distribuicaoUploader = new FileUploader( {
			    url: '../rest/upload',
			    onSuccessItem : function(item, response, status, headers) {
			    	console.log(response);
			    	$scope.elaboracaoNormativa.elaboracaoNormativaConsulta.arquivo = response;
			    	$scope.elaboracaoNormativa.listaElaboracaoNormativaConsulta.push($scope.elaboracaoNormativa.elaboracaoNormativaConsulta);
			    	$scope.elaboracaoNormativa.elaboracaoNormativaConsulta = null;
			    }
			});
			
			$scope.manifestacaoUploader = new FileUploader( {
			    url: '../rest/upload',
			    autoUpload : 'true',
			    //removeAfterUpload : 'true',
			    onSuccessItem : function(item, response, status, headers) {
			    	console.log(response);
			    	// o response contem o caminho relativo do arquivo
			    	$scope.elaboracaoNormativa.arquivoManifestacao = response;
			    },
			});
			// fim config upload
		    
		    $scope.selectParecerista = function(){
		    	console.log($scope.elaboracaoNormativa.equipe);
		    	$scope.pareceristas = $scope.elaboracaoNormativa.equipe.listaEquipeUsuario;
		    	
		    };
		    
		    $scope.adicionarElaboracaoNormativaConsulta = function(){
		    	$scope.distribuicaoUploader.uploadItem(0);
		    }
		    
		    $scope.normas = ElaboracaoNormativaResource.normas();
		    
		    
			$scope.salvar = function() {

		        var successCallback = function(){
		        	$scope.elaboracaoNormativa = new ElaboracaoNormativaResource();
		        	alert('Elaboração Normativa incluida com sucesso');
		        };
		        var errorCallback = function() {
		        	alert('Falha na inclusão');
		        };
		        
		        if (isEditMode()) {
		        	$scope.elaboracaoNormativa.$update(successCallback, errorCallback);
		        } else {
		        	ElaboracaoNormativaResource.save($scope.elaboracaoNormativa, successCallback, errorCallback);
		        }
		        
				
			};
			
			$scope.get = function() {
		        var successCallback = function(data){
		            self.original = data;
		            $scope.elaboracaoNormativa = new ElaboracaoNormativaResource(self.original);
		        };
		        var errorCallback = function() {
		            $location.path("/ElaboracaoNormativa");
		        };
		        
		        ElaboracaoNormativaResource.get({ElaboracaoNormativaId:$routeParams.ElaboracaoNormativaId}, successCallback, errorCallback);
			};
			
		    $scope.cancel = function() {
		        $location.path("/Equipes");
		    };
			
		    function isEditMode() {
			    if ($location.path().indexOf("edit") > -1) {
			    	return true;
				}
			    return false;
		    }

		    if (isEditMode()) {
		    	$scope.get();
		    }

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
	
		    $scope.selected = 'dadosPreliminares';

		});