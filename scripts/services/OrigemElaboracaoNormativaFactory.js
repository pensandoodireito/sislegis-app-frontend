angular.module('sislegisapp').factory('OrigemElaboracaoNormativaResource', function($resource, BACKEND) {
	var resource = $resource(BACKEND + '/origemelaboracaonormativas/:OrigemElaboracaoNormativaId', {
		OrigemElaboracaoNormativaId : '@id'
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
		'findByDescricao' : {
			url : BACKEND + "/origemelaboracaonormativas/find",
		    params: {
			        descricao: '@descricao'
			      },
			method : 'GET'
		}
	});
	return resource;
});
