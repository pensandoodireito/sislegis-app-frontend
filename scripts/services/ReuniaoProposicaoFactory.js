angular.module('sislegisapp').factory('ReuniaoProposicaoResource', function($resource, BACKEND) {
	var resource = $resource(BACKEND + '/reuniaoProposicao/:ReuniaoId/:ProposicaoId/', {
		ReuniaoId : '@idReuniao',
		ProposicaoId : '@idProposicao'
	}, {
		'queryAll' : {
			method : 'GET',
			isArray : true
		},
		'remove' : {
			method : 'DELETE',
			url:BACKEND + '/reuniaoProposicao/:ProposicaoId?data=:ReuniaoId'
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
