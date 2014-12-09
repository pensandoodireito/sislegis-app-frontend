angular.module('sislegisapp').factory('ElaboracaoNormativaConsultaResource', function($resource) {
	var resource = $resource('../rest/elaboracaoNormativaConsulta/:ElaboracaoNormativaConsultaId', {
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