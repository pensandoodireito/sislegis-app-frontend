angular.module('sislegisapp').factory(
		'ElaboracaoNormativaResource',
		function($resource, BACKEND) {
			var resource = $resource(BACKEND + '/elaboracaonormativa/:ElaboracaoNormativaId', {
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
							url : BACKEND + "/elaboracaonormativa/search",
							method : 'GET',
							isArray : true
						},						
						'tipos' : {
							url : BACKEND + "/elaboracaonormativa/tipos",
							method : 'GET',
							isArray : true
						},
						'subTipos' : {
							url : BACKEND + "/elaboracaonormativa/subTipos",
							method : 'GET',
							isArray : true
						},						
						'identificacoes' : {
							url : BACKEND + "/elaboracaonormativa/identificacoes",
							method : 'GET',
							isArray : true
						},
						'normas' : {
							url : BACKEND + "/elaboracaonormativa/normas",
							method : 'GET',
							isArray : true
						},
						'situacoes' : {
							url : BACKEND + "/elaboracaonormativa/situacoes",
							method : 'GET',
							isArray : true
						},						
						'searchElaboracaoNormativa' : {
							url : BACKEND + "/elaboracaonormativa/searchElaboracaoNormativa",
							method : 'GET',
							isArray : true
						},
						'exportarDadosParaExcel' : {
							url : BACKEND + "/elaboracaonormativa/exportarDadosParaExcel",
							method : 'GET',
							isArray : false
						},	
						'consultaServicoWS' : {
							url : BACKEND + "/elaboracaonormativa/consultaServicoWS",
							method : 'GET',
							isArray : true
						},							
						'buscarPorSufixo' : {
							url : BACKEND + "/elaboracaonormativa/buscarPorSufixo",
							method : 'GET',
							isArray : true
						}
					});
			return resource;
		});
