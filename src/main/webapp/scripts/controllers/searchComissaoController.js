

angular.module('sislegisapp').controller('SearchComissaoController', function($scope, $http, ComissaoResource ) {

    $scope.search={};
    $scope.currentPage = 0;
    $scope.pageSize= 10;
    $scope.searchResults = [];
    $scope.filteredResults = [];
    $scope.pageRange = [];
    $scope.numberOfPages = function() {
        var result = Math.ceil($scope.filteredResults.length/$scope.pageSize);
        var max = (result == 0) ? 1 : result;
        $scope.pageRange = [];
        for(var ctr=0;ctr<max;ctr++) {
            $scope.pageRange.push(ctr);
        }
        return max;
    };
    


    $scope.performSearch = function() {
        $scope.searchResults = ComissaoResource.queryAll(function(){
            $scope.numberOfPages();
        });
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
    			$scope.proposicoes = data;
	    });
    }
    
    
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
                $scope.comissoes = data;            });        	
        }
        		
    };    
    
    $scope.previous = function() {
       if($scope.currentPage > 0) {
           $scope.currentPage--;
       }
    };
    
    $scope.next = function() {
       if($scope.currentPage < ($scope.numberOfPages() - 1) ) {
           $scope.currentPage++;
       }
    };
    
    $scope.setPage = function(n) {
       $scope.currentPage = n;
    };

    $scope.performSearch();
});