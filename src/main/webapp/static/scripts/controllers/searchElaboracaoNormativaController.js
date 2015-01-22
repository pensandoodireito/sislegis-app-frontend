

angular.module('sislegisapp').controller('SearchElaboracaoNormativaController', function($scope, $http, toaster, ElaboracaoNormativaResource,
		OrigemElaboracaoNormativaResource, OrgaoResource, StatusSidofResource, EquipeResource, UsuarioResource, TagResource) {

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
    $scope.elaboracaoNormativa.listaTagsSelecionadosDropdown = [];
    
    $scope.tipos = ElaboracaoNormativaResource.tipos();
    
    $scope.identificacoes = ElaboracaoNormativaResource.identificacoes();
    
    $scope.normas = ElaboracaoNormativaResource.normas();
    
    $scope.tags = TagResource.tagsDropdownSelect();
    
    $scope.equipes = EquipeResource.queryAll();
    
    $scope.subTipos = ElaboracaoNormativaResource.subTipos();

    $scope.situacoes = ElaboracaoNormativaResource.situacoes();
    
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
    	var listaTagsSelecionadosDropdown = {};
    	
    	$scope.elaboracaoNormativa.listaOrigensSelecionadosDropdown.forEach(function(value, index) {
    		listaOrigensSelecionadosDropdown[index] = value.id;
    	});
    	
    	$scope.elaboracaoNormativa.listaCoAutoresSelecionadosDropdown.forEach(function(value, index) {
    		listaCoAutoresSelecionadosDropdown[index] = value.id;
    	});
    	
    	$scope.elaboracaoNormativa.listaTagsSelecionadosDropdown.forEach(function(value, index) {
    		listaTagsSelecionadosDropdown[index] = value.id;
    	});    	
    	
    	$scope.searchResults = ElaboracaoNormativaResource
    		.searchElaboracaoNormativa({numero: checkEmpty($scope.elaboracaoNormativa.numero), 
	    		ano: checkEmpty($scope.elaboracaoNormativa.ano), 
	    		listaOrigensSelecionadosDropdown: listaOrigensSelecionadosDropdown,
	    		listaCoAutoresSelecionadosDropdown: listaCoAutoresSelecionadosDropdown,
	    		listaTagsSelecionadosDropdown: listaTagsSelecionadosDropdown,
	    		ementa: checkEmpty($scope.elaboracaoNormativa.ementa), 
	    		statusSidof: $scope.elaboracaoNormativa.statusSidof===undefined?null:$scope.elaboracaoNormativa.statusSidof.id,
	    		objeto: $scope.elaboracaoNormativa.identificacao, 
	    		distribuicao: $scope.elaboracaoNormativa.equipe===undefined?null:$scope.elaboracaoNormativa.equipe.id,
	    		parecerista: $scope.elaboracaoNormativa.parecerista===undefined?null:$scope.elaboracaoNormativa.parecerista.id,
	    		tipo: $scope.elaboracaoNormativa.tipo===undefined?null:$scope.elaboracaoNormativa.tipo,
	    		subTipo: $scope.elaboracaoNormativa.subTipo===undefined?null:$scope.elaboracaoNormativa.subTipo,
	    		elaboracaoNormativaNorma: $scope.elaboracaoNormativa.elaboracaoNormativaNorma===undefined?null:$scope.elaboracaoNormativa.elaboracaoNormativaNorma,
	    		elaboracaoNormativaSituacao: $scope.elaboracaoNormativa.elaboracaoNormativaSituacao===undefined?null:$scope.elaboracaoNormativa.elaboracaoNormativaSituacao});
    };

    $scope.mostraSubTipo = function(){
    	var retorno = false;
    	if($scope.elaboracaoNormativa.tipo!==undefined){
    		if(angular.equals($scope.elaboracaoNormativa.tipo, 'EXPOSICAOMOTIVOS')){
    			retorno = true;
    		}
    	}
    	return retorno;
    }
    
    function checkEmpty(str){
    	if(!str || !/[^\s]+/.test(str)){
    		return null;
    	}
        return str;
    }
});