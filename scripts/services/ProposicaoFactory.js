angular.module('sislegisapp').factory('ProposicaoResource', function($resource) {
	var resource = $resource('http://localhost:8080/sislegis/rest/proposicaos/:ProposicaoId', {
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
			url : "http://localhost:8080/sislegis/rest/proposicaos/salvarProposicoes",
			method : 'POST'
		},
		'buscarCamara' : {
			url : "http://localhost:8080/sislegis/rest/proposicaos/proposicoesPautaCamara",
			method : 'GET',
			isArray : true
		},
		'buscarSenado' : {
			url : "http://localhost:8080/sislegis/rest/proposicaos/proposicoesPautaSenado",
			method : 'GET',
			isArray : true
		},
		'buscarPorSufixo' : {
			url : "http://localhost:8080/sislegis/rest/proposicaos/buscarPorSufixo",
			method : 'GET',
			isArray : true
		},
		'consultar' : {
			url : "http://localhost:8080/sislegis/rest/proposicaos/consultar",
			method : 'GET',
			isArray : true
		}
	});
	return resource;
});