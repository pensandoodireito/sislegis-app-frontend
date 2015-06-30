angular.module('sislegisapp').factory('StatusSidofResource',
		function($resource) {
			return $resource('http://localhost:8080/sislegis/rest/statussidofs/:StatusSidofId', {
				StatusSidofId : '@id'
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
