angular.module('sislegisapp').factory('ReuniaoProposicaoResource', function($resource) {
	var resource = $resource('http://localhost:8080/sislegis/rest/reuniaoProposicao/:ReuniaoId/:ProposicaoId/', {
		ReuniaoId : '@idReuniao',
		ProposicaoId : '@idProposicao'
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
		}
	});
	return resource;
});