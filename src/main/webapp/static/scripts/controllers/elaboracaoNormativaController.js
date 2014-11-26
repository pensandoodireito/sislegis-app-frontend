angular.module('sislegisapp').controller('ElaboracaoNormativaController',
		function($scope, $http, $locale, ElaboracaoNormativaResource, EquipeResource) {
	
			$scope.elaboracaoNormativa = new ElaboracaoNormativaResource();
			$scope.equipes = EquipeResource.queryAll();
			
			$scope.elaboracaoNormativa.listaElaboracaoNormativaConsulta = [];
			
			
		    $scope.tipos = [
		                    {name:'Anteprojeto', shade: '0'}, 
		                    {name:'Preliminar', shade:'1'}
		                    ];
		    
		    $scope.identificacoes = [
		                             {name:'Exposição de Motivo', shade:'0'},
		                             {name:'Exposição de Motivo Interministerial', shade:'1'}
		                             ];
		    
		    $scope.selectParecerista = function(){
		    	console.log($scope.elaboracaoNormativa.equipe);
		    	$scope.pareceristas = $scope.elaboracaoNormativa.equipe.listaEquipeUsuario;
		    	
		    };
		    
		    $scope.adicionarElaboracaoNormativaConsulta = function(){
		    	
		    	$scope.elaboracaoNormativa.listaElaboracaoNormativaConsulta.push($scope.elaboracaoNormativa.elaboracaoNormativaConsulta);
		    	$scope.elaboracaoNormativa.elaboracaoNormativaConsulta = null;
		    }
		    
		    $scope.normas = [
		                     {name:'Decreto Lei', shade:'0'},
		                     {name:'Medida Provisória', shade:'1'}
		                   ];
		    
		    
			$scope.salvar = function() {

		        var successCallback = function(){
		        	$scope.elaboracaoNormativa = new ElaboracaoNormativaResource();
		        	alert('Elaboração Normativa incluida com sucesso');
		        };
		        var errorCallback = function() {
		        	alert('Falha na inclusão');
		        };
		        
				ElaboracaoNormativaResource.save($scope.elaboracaoNormativa,
						successCallback, errorCallback);
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