angular.module('sislegisapp').factory('ReuniaoResource',
		function($resource, BACKEND) {
			return $resource(BACKEND + '/reuniaos/:ReuniaoId', {
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
					url : BACKEND + "/reuniaos/findByData",
					method : 'GET',
					isArray : true
				},				
				'update' : {
					method : 'PUT'
				}
			});
		});
