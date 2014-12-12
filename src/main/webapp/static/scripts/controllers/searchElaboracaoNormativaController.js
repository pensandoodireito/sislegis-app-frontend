

angular.module('sislegisapp').controller('SearchElaboracaoNormativaController', function($scope, $http, ElaboracaoNormativaResource,
		OrigemElaboracaoNormativaResource) {

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
    $scope.tipos = ElaboracaoNormativaResource.tipos();
    
    $scope.identificacoes = ElaboracaoNormativaResource.identificacoes();
    
    $scope.normas = ElaboracaoNormativaResource.normas();

    $scope.performSearch = function() {
        $scope.searchResults = ElaboracaoNormativaResource.queryAll(function(){
            $scope.numberOfPages();
        });
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
    
	$scope.getUsuarios = function(val) {
	    return $http.get('../rest/usuarios/find', {
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
	    return $http.get('../rest/origemelaboracaonormativas/find', {
	      params: {
	        descricao: val
	      }
	    }).then(function(response){
	        if (val) {
	        	var item = new OrigemElaboracaoNormativaResource();
	        	item.descricao = val;
	        	response.data.unshift(item);
	        }
    		return response.data.map(function(item){
    			return item;
    		});
	    },function(error){
	      console.log('Erro ao buscar dados getOrigemElaboracaoNormativas');
	    });
	  };	  

    $scope.performSearch = function(){
    	$scope.searchResults = ElaboracaoNormativaResource.searchElaboracaoNormativa({tipo: $scope.search.tipo, 
    		nup: $scope.search.nup, identificacao: $scope.search.identificacao, 
    		autor: $scope.search.autor===undefined?null:$scope.search.autor.id,
    		origem: $scope.search.origem===undefined?null:$scope.search.origem.id});
    };
});