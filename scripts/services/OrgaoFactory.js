angular.module('sislegisapp').factory('OrgaoResource', function($resource, BACKEND) {
	var resource = $resource(BACKEND + '/orgaos/:OrgaoId', {
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
		},
		'orgaosDropdownSelect' : {
			url : BACKEND + "/orgaos/listAllDropdownMultiple",
			method : 'GET',
			isArray : true
		}		
	});
	return resource;
});
