angular.module('sislegisapp').factory('StatusSidofResource',
		function($resource, BACKEND) {
			return $resource(BACKEND + '/statussidofs/:StatusSidofId', {
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
