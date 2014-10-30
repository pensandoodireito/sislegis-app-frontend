angular.module('sislegisapp').controller('ModalBuscarProposicaoController', function($scope, $http, $filter, $routeParams, $location, $modalInstance, ProposicaoResource, reuniao, listaProposicaoSelecao) {
    var self = this;
    $scope.disabled = false;
    $scope.showDetalhamentoProposicao =false;
    $scope.$location = $location;
    
    $scope.comissao = new Object();
    $scope.reuniao = reuniao;
    
    $scope.listaProposicaoSelecao = [];
    $scope.listaProposicaoPesquisa = {};
    
    $scope.pesquisar = function () {
      $modalInstance.close($scope.listaProposicaoSelecao);
    };

    $scope.ok = function () {
      $modalInstance.close($scope.listaProposicaoSelecao);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    

    $scope.buscarProposicao = function() {
        var formattedDate = $filter('date')(new Date($scope.campoData),
                                    'MM/dd/yyyy');

        var successCallback = function(sucess) {
        	$scope.detalheProposicao = null;
    		$scope.showDetalhamentoProposicao = false;
			$scope.proposicoes = sucess;
			$scope.comissaoProposicao = $scope.comissao.sigla;
        };
        var errorCallback = function() {
        };
        
        if($scope.origem.value == 'C'){
        	ProposicaoResource.buscarCamara(
        			{
        				idComissao : $scope.comissao.id,
        				siglaComissao : $scope.comissao.sigla,
        				data:formattedDate
        			}, successCallback, errorCallback);
        }else{
        	ProposicaoResource.buscarSenado(
        			{
        				idComissao : $scope.comissao.id, // usado para a camara
        				siglaComissao : $scope.comissao.sigla, // usado para o senado
        				data:formattedDate
        			}, successCallback, errorCallback);
        }
    };
   
    $scope.detalharProposicao = function(idProposicao){
    	$http({
  		  method:'GET',
  		  url : ($scope.origem.value == 'C') ? "rest/proposicaos/detalharProposicaoCamaraWS" : "rest/proposicaos/detalharProposicaoSenadoWS",
	      	  params: {
	      		  'id' : idProposicao // id proposicao
	    	  }
  		}).success(function (data) {
  			console.log(data);
  			$scope.detalheProposicao = data;
  			$scope.showDetalhamentoProposicao =true;
        }).error(function(error){
        });        	
    };
  
    $scope.adicionarProposicao = function(proposicao){
    	proposicao.listaReunioes.push($scope.reuniao);
    	$scope.listaProposicaoSelecao.push(proposicao);
    };    

    $scope.removerProposicao = function(proposicao){
    	var index = $scope.listaProposicaoSelecao.indexOf(proposicao)
    	$scope.listaProposicaoSelecao.splice(index, 1);
    }; 
    
    
    $scope.salvar = function() {
        
        var successCallback = function(sucess){
        	$modalInstance.close();
			
        };
        var errorCallback = function() {
        	alert('erro');
        };
    	ProposicaoResource.save($scope.listaProposicaoSelecao, successCallback, errorCallback);
    };
    
    $scope.origens = [
        {value: 'C', displayName: 'Câmara'},
        {value: 'S', displayName: 'Senado'}
     ];  
    
    $scope.selectOrigemComissoes = function() {
        $('#spinner').show();
    	var origemSelecionada = $scope.origem.value;
        if(origemSelecionada=='S'){
            $http.get('rest/comissaos/comissoesSenado').
            success(function(data) {
                $scope.comissoes = data;
                $('#spinner').hide();
            }).error(function(error){
                $('#spinner').hide();
            });        	
        }else if(origemSelecionada=='C'){
            $http.get('rest/comissaos/comissoesCamara').
            success(function(data) {
                $scope.comissoes = data;
                $('#spinner').hide();
            }).error(function(error){
                $('#spinner').hide();
            });        	
        }
        		
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