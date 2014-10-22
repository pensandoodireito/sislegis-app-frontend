angular.module('sislegisapp').controller('ModalBuscarProposicaoController', function($scope, $http, $routeParams, $location, $modalInstance, ProposicaoResource, dataReuniao, listaProposicaoSelecao) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.comissao = new Object();
    $scope.dataReuniao = dataReuniao;
//    $scope.selected = {
//      item: $scope.items[0]
//    };
    
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
    	$http({
    		  method:'GET',
    		  url : ($scope.origem.value == 'C') ? "rest/proposicaos/proposicoesPautaCamara" : "rest/proposicaos/proposicoesPautaSenado",
	      	  params: {
	      		  'idComissao' : $scope.comissao.id, // usado para a camara
	      		  'siglaComissao' : $scope.comissao.sigla, // usado para o senado
	    	      'data': $scope.dataReuniao.split("-").join("/")  //formata a data para o WS receber corretamente o parametro (caso do chrome)
	    	  }
    		}).success(function (data) {
      			console.log(data);
    			$scope.proposicoes = data;
    			$scope.comissaoProposicao = $scope.comissao.sigla;
	    });
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
	    });
    };
  
    $scope.adicionarProposicao = function(proposicao){
    	$scope.listaProposicaoSelecao.push(proposicao);
    };    

    $scope.removerProposicao = function(proposicao){
    	var index = $scope.listaProposicaoSelecao.indexOf(proposicao)
    	$scope.listaProposicaoSelecao.splice(index, 1);
    }; 
    
    
    $scope.salvar = function() {
    	ProposicaoResource.save($scope.listaProposicaoSelecao);
    };
    
    $scope.origens = [
        {value: 'C', displayName: 'Câmara'},
        {value: 'S', displayName: 'Senado'}
     ];  
    
    $scope.selectOrigemComissoes = function() {
    	var origemSelecionada = $scope.origem.value;
        if(origemSelecionada=='S'){
            $http.get('rest/comissaos/comissoesSenado').
            success(function(data) {
                $scope.comissoes = data;
            });
        }else if(origemSelecionada=='C'){
            $http.get('rest/comissaos/comissoesCamara').
            success(function(data) {
                $scope.comissoes = data;});        	
        }
        		
    }; 
});