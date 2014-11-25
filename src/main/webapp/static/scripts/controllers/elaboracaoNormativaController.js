angular.module('sislegisapp').controller('ElaboracaoNormativaController',
		function($scope, $http, ElaboracaoNormativaResource, EquipeResource) {
	
			$scope.elaboracaoNormativa = new ElaboracaoNormativaResource();
			$scope.equipes = EquipeResource.queryAll();
			
			$scope.elaboracaoNormativa.listaElaboracaoNormativaConsulta = [];
			
		    $scope.tipos = ["Anteprojeto", "Preliminar"];
		    
		    $scope.identificacoes = ["Exposição de Motivo", "Exposição de Motivo Interministerial"];
		    
		    $scope.selectParecerista = function(){
		    	console.log($scope.elaboracaoNormativa.equipe);
		    	$scope.pareceristas = $scope.elaboracaoNormativa.equipe.listaEquipeUsuario;
		    	
		    };
		    
		    $scope.adicionarElaboracaoNormativaConsulta = function(){
		    	
		    	$scope.elaboracaoNormativa.listaElaboracaoNormativaConsulta.push($scope.elaboracaoNormativa.elaboracaoNormativaConsulta);
		    	$scope.elaboracaoNormativa.elaboracaoNormativaConsulta = null;
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
	
			$scope.tabs = [ {
				title : 'Dados preliminares',
				url : 'dadosPreliminares.html'
			}, {
				title : 'Dados de análise/Distribuição',
				url : 'dadosAnaliseDistribuicao.html'
			}, {
				title : 'Manifestação',
				url : 'manifestacao.html'
			} ];

			$scope.currentTab = 'dadosPreliminares.html';

			$scope.onClickTab = function(tab) {
				$scope.currentTab = tab.url;
			}

			$scope.isActiveTab = function(tabUrl) {
				return tabUrl == $scope.currentTab;
			}
			


		});
