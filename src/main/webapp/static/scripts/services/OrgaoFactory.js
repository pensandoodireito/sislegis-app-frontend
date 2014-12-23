angular.module('sislegisapp').factory('OrgaoResource', function($resource) {
	var resource = $resource('../rest/orgaos/:OrgaoId', {
		OrgaoId : '@id'
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
	return resource;
});