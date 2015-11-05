angular.module('sislegisapp').factory('ComentarioResource', function($resource, BACKEND) {
	var resource = $resource(BACKEND + '/comentarios/:ComentarioId', {
		ComentarioId : '@id'
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
		'findByProposicao' : {
			url : BACKEND + "/comentarios/proposicao/:ProposicaoId",
			method : 'GET',
			isArray : true
		},
		'ocultar' : {
			url : BACKEND + "/comentarios/ocultar/:idComentario",
			method : 'GET',
			isArray : true
		}
	});
	return resource;
});
