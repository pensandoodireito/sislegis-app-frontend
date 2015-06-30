angular.module('sislegisapp').factory('AreaConsultadaResource', function($resource) {
	var resource = $resource('../rest/areaconsultadas/:AreaConsultadaId', {
		AreaConsultadaId : '@id'
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