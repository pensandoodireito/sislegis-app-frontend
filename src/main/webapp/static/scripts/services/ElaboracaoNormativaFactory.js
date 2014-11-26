angular.module('sislegisapp').factory(
		'ElaboracaoNormativaResource',
		function($resource) {
			var resource = $resource('../rest/elaboracaonormativa/:ElaboracaoNormativaId', {
						ElaboracaoNormativaId : '@id'
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
						'tipos' : {
							url : "../rest/elaboracaonormativa/tipos",
							method : 'GET',
							isArray : true
						}
					});
			return resource;
		});