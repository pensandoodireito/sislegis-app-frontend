angular.module('sislegisapp').factory('TagResource',
		function($resource) {
			return $resource('../rest/tags/:TagId', {
				TagId : '@id'
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
				'listarTodos' : {
					url : "../rest/tags/listarTodos",
					method : 'GET',
					isArray : true
				}
			});
		});
