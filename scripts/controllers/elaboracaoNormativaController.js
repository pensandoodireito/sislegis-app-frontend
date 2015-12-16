angular.module('sislegisapp').controller('ElaboracaoNormativaController',
		function($scope, $http, $routeParams, $sce, $location, $locale, $parse, toaster, locationParser, ElaboracaoNormativaResource, 
				EquipeResource, FileUploader, ComentarioResource, AreaConsultadaResource,
				OrigemElaboracaoNormativaResource, UsuarioResource, ElaboracaoNormativaConsultaResource, 
				StatusSidofResource, OrgaoResource, BACKEND) {
	
	
			var self = this;
			$scope.disabled = false;
			$scope.showAbaSEI = false;
		    $scope.$location = $location;
			$scope.elaboracaoNormativa = $scope.elaboracaoNormativa || {};
			$scope.equipes = EquipeResource.queryAll();
			
			
			$scope.onlyNumbers = /^\d+$/;
			
			$scope.elaboracaoNormativaConsulta = new ElaboracaoNormativaConsultaResource();
			
			$scope.elaboracaoNormativa.listaElaboracaoNormativaConsulta = [];
			
			$scope.elaboracaoNormativa.listaCoAutoresSelecionadosDropdown = $scope.elaboracaoNormativa.listaCoAutoresSelecionadosDropdown || [];
			
			$scope.elaboracaoNormativa.listaComentario = $scope.elaboracaoNormativa.listaComentario || [];
			
		    $scope.tipos = ElaboracaoNormativaResource.tipos();
		    
		    $scope.subTipos = ElaboracaoNormativaResource.subTipos();
		    
		    $scope.identificacoes = ElaboracaoNormativaResource.identificacoes();
		    
		    $scope.listaStatusSidof = StatusSidofResource.queryAll();
		    
		    $scope.situacoes = ElaboracaoNormativaResource.situacoes();
		    
		    $scope.orgaos = OrgaoResource.orgaosDropdownSelect();
		    
		    // inicio config upload
			$scope.distribuicaoUploader = new FileUploader( {
			    url: BACKEND+'/upload',
			    onSuccessItem : function(item, response, status, headers) {
			    	console.log(response);
			    	$scope.elaboracaoNormativa.elaboracaoNormativaConsulta.arquivo = response;
			    	$scope.elaboracaoNormativa.listaElaboracaoNormativaConsulta.push($scope.elaboracaoNormativa.elaboracaoNormativaConsulta);
			    	$scope.elaboracaoNormativa.elaboracaoNormativaConsulta = null;
			    }
			});
			
			$scope.manifestacaoUploader = new FileUploader( {
			    url: BACKEND + '/upload',
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
		    	$scope.elaboracaoNormativa.pareceristas = UsuarioResource.findByIdEquipe({idEquipe : $scope.elaboracaoNormativa.equipe.id});
		    	
		    };
		    
		    $scope.linkSei = function() {
		    	if(!checkEmpty($scope.elaboracaoNormativa.nup)
		    			&&!checkEmpty($scope.elaboracaoNormativa.linkSei)){
		    		$scope.showAbaSEI = true;
		    		return $sce.trustAsResourceUrl($scope.elaboracaoNormativa.linkSei);
		    	}
				return $sce.trustAsResourceUrl("");
			};
		    
		    $scope.adicionarElaboracaoNormativaConsulta = function(){
		    	//TODO: Verificar erro quando não é adicionado nenhum arquivo 
		    	//$scope.distribuicaoUploader.uploadItem(0);
		    	//$scope.elaboracaoNormativa.elaboracaoNormativaConsulta.elaboracaoNormativa = $scope.elaboracaoNormativa;
		    	$scope.elaboracaoNormativa.listaElaboracaoNormativaConsulta.push($scope.elaboracaoNormativaConsulta);
		    	$scope.elaboracaoNormativaConsulta = new ElaboracaoNormativaConsultaResource();
		    }
		    
		    $scope.adicionarComentario = function(comentario){
		    	$scope.elaboracaoNormativa.listaComentario.push(comentario);
		    	$scope.comentario =null;
		    }
		    
		    $scope.excluirComentario = function(comentario){
				var index = $scope.elaboracaoNormativa.listaComentario.indexOf(comentario);
				$scope.elaboracaoNormativa.listaComentario.splice(index, 1);
		    }
		    
		    
		    $scope.normas = ElaboracaoNormativaResource.normas();
		    
		    
			$scope.salvar = function() {

		        var successCallback = function(data,responseHeaders){
		            var id = isEditMode()?data.id:locationParser(responseHeaders);
		            $location.path('/ElaboracaoNormativa/edit/' + id);
		            $scope.displayError = false;
					
		        	$scope.selected = "dadosPreliminares";
		        	toaster.pop('success', 'Elaboração Normativa salvo com sucesso');
		        };
		        var errorCallback = function() {
		        	toaster.pop('error', 'Falha na inclusão');
		        };
		        
		        if (isEditMode()) {
		        	//$scope.elaboracaoNormativa.$update(successCallback, errorCallback);
		        	ElaboracaoNormativaResource.update($scope.elaboracaoNormativa, successCallback, errorCallback);
		        } else {
		        	ElaboracaoNormativaResource.save($scope.elaboracaoNormativa, successCallback, errorCallback);
		        }
		        
				
			};
			
			$scope.get = function() {
		        var successCallback = function(data){
		            self.original = data;
		            $scope.elaboracaoNormativa = new ElaboracaoNormativaResource(self.original);
					$scope.elaboracaoNormativa.listaCoAutoresSelecionadosDropdown = $scope.elaboracaoNormativa.listaCoAutoresSelecionadosDropdown || [];
					$scope.elaboracaoNormativa.listaElaboracaoNormativaConsulta = $scope.elaboracaoNormativa.listaElaboracaoNormativaConsulta || [];
					$scope.elaboracaoNormativa.listaComentario = $scope.elaboracaoNormativa.listaComentario || [];
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
		    
		    $scope.excluirElaboracaoNormativa = function(elaboracaoNormativaConsulta){
				var index = $scope.elaboracaoNormativa.listaElaboracaoNormativaConsulta.indexOf(elaboracaoNormativaConsulta);
				$scope.elaboracaoNormativa.listaElaboracaoNormativaConsulta.splice(index, 1);
		    }
		    

			$scope.getCoAutor = function(val) {
			    return $http.get(BACKEND + '/orgaos/find', {
			      params: {
			        nome: val
			      }
			    }).then(function(response){
			      return response.data.map(function(item){
			        return item;
			      });
			    });
			  };

			$scope.getOrigemElaboracaoNormativas = function(val) {
			    return $http.get(BACKEND + '/orgaos/find', {
			      params: {
			        nome: val
			      }
			    }).then(function(response){
			        if (val) {
			        	var item = new OrgaoResource();
			        	item.nome = val;
			        	response.data.unshift(item);
			        }
		    		return response.data.map(function(item){
		    			return item;
		    		});
			    },function(error){
			      console.log('Erro ao buscar dados getOrigemElaboracaoNormativas');
			    });
			  };
				   
			$scope.getAreaConsultadas = function(val) {
			    return $http.get(BACKEND + '/areaconsultadas/find', {
			      params: {
			        descricao: val
			      }
			    }).then(function(response){
			        if (val) {
			        	var item = new AreaConsultadaResource();
			        	item.descricao = val;
			        	response.data.unshift(item);
			        }
			      return response.data.map(function(item){
			        return item;
			      });
			    });
			  };

		    $scope.onSelectAreaConsultadas = function (item) {
		    	if(!item.id){
			    	item.$save(function(success){
			    		toaster.pop('success', 'Registro inserido com sucesso.');
			    	});
		    	}
		    };
			    
		    // CALENDARIO
		    $scope.setCalendar = function() {
				$scope.openCalendar = function($event, id) {
					$event.preventDefault();
					$event.stopPropagation();
					var opened = 'opened_'+id;
					var model = $parse(opened);
					model.assign($scope, true);
					$scope.apply;
			
				};

				$scope.dateOptions = {
					formatYear : 'yy',
					startingDay : 1
				};

		    }
		    
		    $scope.setCalendar();	
		    
		    $scope.format = 'dd/MM/yyyy';
		    
		    //Aba default
		    $scope.selected = "dadosPreliminares";
		    
		    $scope.mostraSubTipo = function(){
		    	var retorno = false;
		    	if($scope.elaboracaoNormativa.tipo!==undefined){
		    		if(angular.equals($scope.elaboracaoNormativa.tipo, 'EXPOSICAOMOTIVOS')){
		    			retorno = true;
		    		}
		    	}
		    	return retorno;
		    }
		    
		    $scope.validaCampos = function(campo){
		    	return checkEmpty(campo);
		    }
		    
		    $scope.validaCamposNormaGerada = function(campoElaboracaoNormativaNorma, campo){
		    	return (!checkEmpty(campoElaboracaoNormativaNorma) && checkEmpty(campo));
		    }
		    
		    $scope.validaForm = function(){
		    	if($scope.elaboracaoNormativa.tipo!==undefined){
		    		if(angular.equals($scope.elaboracaoNormativa.tipo, 'EXPOSICAOMOTIVOS')
		    				&& checkEmpty($scope.elaboracaoNormativa.subTipo)){
		    			return true;
		    		}
		    		if(!checkEmpty($scope.elaboracaoNormativa.elaboracaoNormativaNorma)){
			    		if(checkEmpty($scope.elaboracaoNormativa.normaGeradaNumero) 
			    				||checkEmpty($scope.elaboracaoNormativa.normaGeradaAno)){
			    			return true;
			    		}
		    		}
		    		if(checkEmpty($scope.elaboracaoNormativa.tipo) 
		    				||checkEmpty($scope.elaboracaoNormativa.ementa)
		    				||checkEmpty($scope.elaboracaoNormativa.identificacao)
		    				||checkEmpty($scope.elaboracaoNormativa.ano)
		    				||checkEmpty($scope.elaboracaoNormativa.nup)
		    				||checkEmpty($scope.elaboracaoNormativa.origem)){
		    			return true;
		    		}
		    	}else{
		    		return true;
		    	}
		    	return false;
		    }
	
		    function checkEmpty(str){
		    	if(!str || !/[^\s]+/.test(str)){
		    		return true;
		    	}
		        return false;
		    }
		    
		    

		});
