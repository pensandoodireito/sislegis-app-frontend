angular.module('sislegisapp').factory(
		'ElaboracaoNormativaResource',
		function($resource) {
			var resource = $resource('http://localhost:8080/sislegis/rest/elaboracaonormativa/:ElaboracaoNormativaId', {
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
						'search' : {
							url : "http://localhost:8080/sislegis/rest/elaboracaonormativa/search",
							method : 'GET',
							isArray : true
						},						
						'tipos' : {
							url : "http://localhost:8080/sislegis/rest/elaboracaonormativa/tipos",
							method : 'GET',
							isArray : true
						},
						'subTipos' : {
							url : "http://localhost:8080/sislegis/rest/elaboracaonormativa/subTipos",
							method : 'GET',
							isArray : true
						},						
						'identificacoes' : {
							url : "http://localhost:8080/sislegis/rest/elaboracaonormativa/identificacoes",
							method : 'GET',
							isArray : true
						},
						'normas' : {
							url : "http://localhost:8080/sislegis/rest/elaboracaonormativa/normas",
							method : 'GET',
							isArray : true
						},
						'situacoes' : {
							url : "http://localhost:8080/sislegis/rest/elaboracaonormativa/situacoes",
							method : 'GET',
							isArray : true
						},						
						'searchElaboracaoNormativa' : {
							url : "http://localhost:8080/sislegis/rest/elaboracaonormativa/searchElaboracaoNormativa",
							method : 'GET',
							isArray : true
						},
						'exportarDadosParaExcel' : {
							url : "http://localhost:8080/sislegis/rest/elaboracaonormativa/exportarDadosParaExcel",
							method : 'GET',
							isArray : false
						},	
						'consultaServicoWS' : {
							url : "http://localhost:8080/sislegis/rest/elaboracaonormativa/consultaServicoWS",
							method : 'GET',
							isArray : true
						},							
						'buscarPorSufixo' : {
							url : "http://localhost:8080/sislegis/rest/elaboracaonormativa/buscarPorSufixo",
							method : 'GET',
							isArray : true
						}
					});
			return resource;
		});