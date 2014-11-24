angular.module('sislegisapp').factory('ReuniaoProposicaoResource',
		function($resource) {
			return $resource('../rest/reuniaoProposicao/:ReuniaoProposicaoId', {
				ReuniaoProposicaoId : '@id'
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
		});
