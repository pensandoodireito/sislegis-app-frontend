angular.module('sislegisapp').factory('OrigemElaboracaoNormativaResource', function($resource) {
	var resource = $resource('http://localhost:8080/sislegis/rest/origemelaboracaonormativas/:OrigemElaboracaoNormativaId', {
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
			url : "http://localhost:8080/sislegis/rest/origemelaboracaonormativas/find",
		    params: {
			        descricao: '@descricao'
			      },
			method : 'GET'
		}
	});
	return resource;
});