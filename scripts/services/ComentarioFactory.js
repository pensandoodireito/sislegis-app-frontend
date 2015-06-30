angular.module('sislegisapp').factory('ComentarioResource', function($resource) {
	var resource = $resource('http://localhost:8080/sislegis/rest/comentarios/:ComentarioId', {
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
			url : "http://localhost:8080/sislegis/rest/comentarios/proposicao/:ProposicaoId",
			method : 'GET',
			isArray : true
		}
	});
	return resource;
});
