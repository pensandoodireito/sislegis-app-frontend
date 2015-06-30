angular.module('sislegisapp').factory('OrgaoResource', function($resource) {
	var resource = $resource('http://localhost:8080/sislegis/rest/orgaos/:OrgaoId', {
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
			url : "http://localhost:8080/sislegis/rest/orgaos/listAllDropdownMultiple",
			method : 'GET',
			isArray : true
		}		
	});
	return resource;
});