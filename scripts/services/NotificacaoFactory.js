angular.module('sislegisapp').factory('NotificacaoResource', function($resource, BACKEND) {
	var resource = $resource(BACKEND + '/notificacao/', {
	}, {	
		'buscarPorUsuario' : {
			url : BACKEND + "/notificacao/usuario/:categoria",
			method : 'GET',
			isArray: true
		},			
		'markvisualizadas' : {
			method : 'POST',
			url : BACKEND + "/notificacao/marcarVisualizadas"
		}
	});
	return resource;
});
