angular.module('sislegisapp').factory('EncaminhamentoProposicaoResource', function($resource) {
	var resource = $resource('rest/encaminhamentoProposicao/:EncaminhamentoProposicaoId', {
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
			url : "rest/comentarios/proposicao/:ProposicaoId",
			method : 'GET',
			isArray : true
		}
	});
	return resource;
});