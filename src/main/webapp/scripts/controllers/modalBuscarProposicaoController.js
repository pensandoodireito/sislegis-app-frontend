angular.module('sislegisapp').controller('ModalBuscarProposicaoController', function($scope, $http, $routeParams, $location, $modalInstance, ProposicaoResource, reuniao, listaProposicaoSelecao) {
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
    	var curr_date = ('0' + ($scope.campoData.getDate())).slice(-2);
        var curr_month = ('0' + ($scope.campoData.getMonth()+1)).slice(-2); // Adicionando o 0 manualmente quando o mes tem apenas 1 digito
        var curr_year = $scope.campoData.getFullYear();
        var formattedDate = curr_year + "" + curr_month + "" + curr_date

        $('#spinner').show();
        
        var successCallback = function(sucess) {
        	$scope.detalheProposicao = null;
    		$scope.showDetalhamentoProposicao = false;
			$scope.proposicoes = sucess;
			$scope.comissaoProposicao = $scope.comissao.sigla;
			$('#spinner').hide();
        };
        var errorCallback = function() {
    		$('#spinner').hide();
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
        $('#spinner').show();
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
            $('#spinner').hide();
        }).error(function(error){
            $('#spinner').hide();
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
		$('#spinner').show();
        
        var successCallback = function(sucess){
        	$modalInstance.close();
			$('#spinner').hide();
			
        };
        var errorCallback = function() {
        	alert('erro');
    		$('#spinner').hide();
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