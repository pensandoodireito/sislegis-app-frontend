angular.module('sislegisapp').factory('ReuniaoProposicaoResource', function($resource, BACKEND) {
	var resource = $resource(BACKEND + '/reuniaoProposicao/:ReuniaoId/:ProposicaoId/', {
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
