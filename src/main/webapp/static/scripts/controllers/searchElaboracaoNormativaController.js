

angular.module('sislegisapp').controller('SearchElaboracaoNormativaController', function($scope, $http, toaster, ElaboracaoNormativaResource,
		OrigemElaboracaoNormativaResource, OrgaoResource, StatusSidofResource, EquipeResource, UsuarioResource) {

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
    $scope.elaboracaoNormativa = $scope.elaboracaoNormativa || {};
    $scope.elaboracaoNormativa.listaOrigensSelecionadosDropdown = [];
    $scope.elaboracaoNormativa.listaCoAutoresSelecionadosDropdown = [];
    
    $scope.tipos = ElaboracaoNormativaResource.tipos();
    
    $scope.identificacoes = ElaboracaoNormativaResource.identificacoes();
    
    $scope.normas = ElaboracaoNormativaResource.normas();
    
    $scope.equipes = EquipeResource.queryAll();

/*    $scope.performSearch = function() {
        $scope.searchResults = ElaboracaoNormativaResource.queryAll(function(){
            $scope.numberOfPages();
        });
        var successCallback = function(){
        	toaster.pop('success', 'Elaboração Normativa salvo com sucesso');
        };
        var errorCallback = function() {
        	toaster.pop('error', 'Falha na inclusão');
        };
        
        $scope.searchResults = ElaboracaoNormativaResource.search($scope.elaboracaoNormativa, successCallback, errorCallback);        
    };*/
    
    $scope.selectParecerista = function(){
    	console.log($scope.elaboracaoNormativa.equipe);
    	$scope.elaboracaoNormativa.pareceristas = UsuarioResource.findByIdEquipe({idEquipe : $scope.elaboracaoNormativa.equipe.id});
    	
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
    
    $scope.example1model = []; 
    
	$scope.orgaos = OrgaoResource.orgaosDropdownSelect();
	
	$scope.identificacoes = ElaboracaoNormativaResource.identificacoes();
	
	$scope.listaStatusSidof = StatusSidofResource.queryAll();
    
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
    	var listaOrigensSelecionadosDropdown = {};
    	var listaCoAutoresSelecionadosDropdown = {};
    	
    	$scope.elaboracaoNormativa.listaOrigensSelecionadosDropdown.forEach(function(value, index) {
    		listaOrigensSelecionadosDropdown[index] = value.id;
    	});
    	
    	$scope.elaboracaoNormativa.listaCoAutoresSelecionadosDropdown.forEach(function(value, index) {
    		listaCoAutoresSelecionadosDropdown[index] = value.id;
    	});
    	
    	$scope.searchResults = ElaboracaoNormativaResource
    		.searchElaboracaoNormativa({numero: checkEmpty($scope.elaboracaoNormativa.numero), 
	    		ano: checkEmpty($scope.elaboracaoNormativa.ano), 
	    		listaOrigensSelecionadosDropdown: listaOrigensSelecionadosDropdown,
	    		listaCoAutoresSelecionadosDropdown: listaCoAutoresSelecionadosDropdown,
	    		ementa: checkEmpty($scope.elaboracaoNormativa.ementa), 
	    		statusSidof: $scope.elaboracaoNormativa.statusSidof===undefined?null:$scope.elaboracaoNormativa.statusSidof.id,
	    		objeto: $scope.elaboracaoNormativa.identificacao, 
	    		distribuicao: $scope.elaboracaoNormativa.equipe===undefined?null:$scope.elaboracaoNormativa.equipe.id,
	    		parecerista: $scope.elaboracaoNormativa.parecerista===undefined?null:$scope.elaboracaoNormativa.parecerista.id});
    };
    
    function checkEmpty(str){
    	if(!str || !/[^\s]+/.test(str)){
    		return null;
    	}
        return str;
    }
});