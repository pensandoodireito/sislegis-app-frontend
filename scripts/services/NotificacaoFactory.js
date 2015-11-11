angular.module('sislegisapp').factory('NotificacaoResource', function($resource, BACKEND) {
	var resource = $resource(BACKEND + '/notificacao/', {
	}, {	
		'buscarPorUsuario' : {
			url : BACKEND + "/notificacao/usuario/:categoria",
			method : 'GET',
			isArray: true
		},			
		'setViewed' : {
			method : 'POST',
			url : BACKEND + "/notificacao/usuario"
		}
	});
	return resource;
});
