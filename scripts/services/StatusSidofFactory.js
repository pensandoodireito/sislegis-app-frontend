angular.module('sislegisapp').factory('StatusSidofResource',
		function($resource) {
			return $resource('../rest/statussidofs/:StatusSidofId', {
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
