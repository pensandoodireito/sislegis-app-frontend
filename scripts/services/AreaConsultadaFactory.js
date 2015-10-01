angular.module('sislegisapp').factory('AreaConsultadaResource', function($resource, BACKEND) {
	var resource = $resource(BACKEND + '/areaconsultadas/:AreaConsultadaId', {
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
