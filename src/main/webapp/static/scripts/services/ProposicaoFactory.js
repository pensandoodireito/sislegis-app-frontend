angular.module('sislegisapp').factory('ProposicaoResource', function($resource) {
	var resource = $resource('../rest/proposicaos/:ProposicaoId', {
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
			url : "../rest/proposicaos/salvarProposicoes",
			method : 'POST'
		},
		'buscarCamara' : {
			url : "../rest/proposicaos/proposicoesPautaCamara",
			method : 'GET',
			isArray : true
		},
		'buscarSenado' : {
			url : "../rest/proposicaos/proposicoesPautaSenado",
			method : 'GET',
			isArray : true
		},
		'buscarPorSufixo' : {
			url : "../rest/proposicaos/buscarPorSufixo",
			method : 'GET',
			isArray : true
		}
	});
	return resource;
});