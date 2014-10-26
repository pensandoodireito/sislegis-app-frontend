angular.module('sislegisapp').factory('ReuniaoResource',
		function($resource) {
			return $resource('rest/reuniaos/:ReuniaoId', {
				ReuniaoId : '@id'
			}, {
				'queryAll' : {
					method : 'GET',
					isArray : true
				},
				'query' : {
					method : 'GET',
					isArray : false
				},
				'buscarReuniaoPorData' : {
					url : "rest/reuniaos/findByData",
					method : 'GET',
					isArray : true
				},				
				'update' : {
					method : 'PUT'
				}
			});
		});
