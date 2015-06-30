angular.module('sislegisapp').factory('EncaminhamentoProposicaoResource', function($resource) {
	var resource = $resource('http://localhost:8080/sislegis/rest/encaminhamentoProposicao/:EncaminhamentoProposicaoId', {
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
			url : "http://localhost:8080/sislegis/rest/encaminhamentoProposicao/proposicao/:ProposicaoId",
			method : 'GET',
			isArray : true
		}
	});
	return resource;
});
