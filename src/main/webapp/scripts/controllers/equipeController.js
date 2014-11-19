
angular.module('sislegisapp').controller('EquipeController', function ($scope, $routeParams,  $location, locationParser, EquipeResource, UsuarioResource ) {
	var self = this;
	$scope.disabled = false;
    $scope.$location = $location;
    $scope.equipe = $scope.equipe || {};
    $scope.equipe.listaEquipeUsuario = $scope.equipe.listaEquipeUsuario || [];

    $scope.usuariosList = UsuarioResource.queryAll(function(items){
        $scope.usuariosSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.nome
            });
        });
    });
    
    $scope.adicionarUsuario = function() {
    	var usuarioSelecionado = $scope.usuarioSelecionado;
    	
    	if (typeof usuarioSelecionado != 'undefined') {
    		var equipeUsuarioItem = {};
        	equipeUsuarioItem.equipe = $scope.equipe.id;
            equipeUsuarioItem.usuario = usuarioSelecionado;
            equipeUsuarioItem.isCoordenador = false;
            $scope.equipe.listaEquipeUsuario.push(equipeUsuarioItem);
    	}
    }
    
    $scope.removerUsuario = function(equipeUsuario) {
    	var index = $scope.equipe.listaEquipeUsuario.indexOf(equipeUsuario);
		$scope.equipe.listaEquipeUsuario.splice(index, 1);
    }
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.equipe = new EquipeResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/Equipes");
        };
        
        EquipeResource.get({EquipeId:$routeParams.EquipeId}, successCallback, errorCallback);
    };
    
    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Equipes/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        
        // Edição
        if ($location.path().indexOf("edit") > -1) {
        	$scope.equipe.$update(successCallback, errorCallback);
        } else { // Adição
        	EquipeResource.save($scope.equipe, successCallback, errorCallback);
        }
    };
    
    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Equipes");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.equipe.$remove(successCallback, errorCallback);
    };
    
    
    $scope.cancel = function() {
        $location.path("/Equipes");
    };
    
    $scope.isClean = function() {
    	console.log(self.original);
    	console.log("----------");
    	console.log($scope.equipe);
    	console.log(angular.equals(self.original, $scope.equipe));
        return angular.equals(self.original, $scope.equipe);
    };
    
    // Chama apenas em caso de edição
    if ($location.path().indexOf("edit") > -1) {
    	$scope.get();
	}
});