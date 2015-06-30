angular.module('sislegisapp').factory('UsuarioResource', function($resource){
	    var resource = $resource('http://localhost:8080/sislegis/rest/usuarios/:UsuarioId', {
		UsuarioId : '@id'
	}, {
		'queryAll' : {
			method : 'GET',
			isArray : true
		},
		'query' : {
			method : 'GET',
			isArray : false
		},
		'update' : {
			method : 'PUT'
		},
		'findByIdEquipe' : {
			url : "http://localhost:8080/sislegis/rest/usuarios/findByIdEquipe",
			method : 'GET',
			isArray : true
		}
	});
	return resource;
});
