angular.module('sislegisapp').factory('ReuniaoResource',
		function($resource) {
			return $resource('http://localhost:8080/sislegis/rest/reuniaos/:ReuniaoId', {
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
					url : "http://localhost:8080/sislegis/rest/reuniaos/findByData",
					method : 'GET',
					isArray : true
				},				
				'update' : {
					method : 'PUT'
				}
			});
		});
