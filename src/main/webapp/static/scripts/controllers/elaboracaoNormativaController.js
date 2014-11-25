angular.module('sislegisapp').controller('ElaboracaoNormativaController',
		function($scope, $http, ElaboracaoNormativaResource) {
	
			$scope.elaboracaoNormativaResource = new ElaboracaoNormativaResource();
			
		    $scope.tipos = ElaboracaoNormativaResource.tipos();
		    
		    
	    	$scope.tabs = [];

	    	this.addTab = function(tab){
	    		$scope.tabs.push(tab);
	    	};

	    	$scope.selectTab = function(tab){
	    		for(var i=0; i<$scope.tabs.length; i++){
	    			if(tab.name != $scope.tabs[i].name){
		    			$scope.tabs[i].selected = false;
		    		}
		    		else {
		    			$scope.tabs[i].selected = true;
		    		}
	    		}
	    	};
		    
			$scope.tabs = [
							{ name: 'Tab1', id: 'Tab1'},
							{ name: 'Tab2', id: 'Tab2'},
							{ name: 'Tab3', id: 'Tab3'},
							{ name: 'Tab4', id: 'Tab4'},
							{ name: 'Tab5', id: 'Tab5'},
							{ name: 'Tab6', id: 'Tab6'},
							{ name: 'Tab7', id: 'Tab7'}
						];
			
			
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
