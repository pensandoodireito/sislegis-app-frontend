angular.module('sislegisapp').factory('ProposicaoResource', function($resource, BACKEND) {
	var resource = $resource(BACKEND + '/proposicaos/:ProposicaoId', {
		ProposicaoId : '@id'
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
		'salvarProposicoes' : {
			url : BACKEND + "/proposicaos/salvarProposicoes",
			method : 'POST'
		},
		'salvarProposicaoIndependente' : {
			url : BACKEND + "/proposicaos/salvarProposicaoExtra",
			method : 'POST'
		},
		'buscarCamara' : {
			url : BACKEND + "/proposicaos/proposicoesPautaCamara",
			method : 'GET',
			isArray : true
		},
		'buscarSenado' : {
			url : BACKEND + "/proposicaos/proposicoesPautaSenado",
			method : 'GET',
			isArray : true
		},
		'buscarPorSufixo' : {
			url : BACKEND + "/proposicaos/buscarPorSufixo",
			method : 'GET',
			isArray : true
		},
		'consultar' : {
			url : BACKEND + "/proposicaos/consultar",
			method : 'GET',
			isArray : true
		},
		'followProposicao' : {
			url : BACKEND + "/proposicaos/follow/:ProposicaoId",
			method : 'POST'
		},
		'unfollowProposicao' : {
			url : BACKEND + "/proposicaos/follow/:ProposicaoId",
			method : 'DELETE'
		}
	});
	return resource;
});
