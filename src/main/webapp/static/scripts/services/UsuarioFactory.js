angular.module('sislegisapp').factory('UsuarioResource', function($resource){
	    var resource = $resource('../rest/usuarios/:UsuarioId', {
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
			url : "../rest/usuarios/findByIdEquipe",
			method : 'GET',
			isArray : true
		}
	});
	return resource;
});
