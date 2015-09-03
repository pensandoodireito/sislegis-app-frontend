angular.module('sislegisapp').factory('EncaminhamentoProposicaoResource', function($resource, BACKEND) {
	var resource = $resource(BACKEND + '/encaminhamentoProposicao/:EncaminhamentoProposicaoId', {
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
			url : BACKEND + "/encaminhamentoProposicao/proposicao/:ProposicaoId",
			method : 'GET',
			isArray : true
		}
	});
	return resource;
});
