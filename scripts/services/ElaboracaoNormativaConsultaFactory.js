angular.module('sislegisapp').factory('ElaboracaoNormativaConsultaResource', function($resource, BACKEND) {
	var resource = $resource(BACKEND + '/elaboracaoNormativaConsulta/:ElaboracaoNormativaConsultaId', {
		ElaboracaoNormativaConsultaId : '@id'
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
