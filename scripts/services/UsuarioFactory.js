angular.module('sislegisapp').factory('UsuarioResource', function($resource, BACKEND){
	    var resource = $resource(BACKEND + '/usuarios/:UsuarioId', {
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
        'me' : {
			method : 'GET',
			isArray : false,
            url : BACKEND + "/usuarios/me",
		},
		'update' : {
			method : 'PUT'
		},
		'findByIdEquipe' : {
			url : BACKEND + "/usuarios/findByIdEquipe",
			method : 'GET',
			isArray : true
		},
		'proposicoesSeguidas' : {
			url : BACKEND + "/usuarios/proposicoesSeguidas",
			method : 'GET',
			isArray : true
		}
		
		
	});
	return resource;
});
