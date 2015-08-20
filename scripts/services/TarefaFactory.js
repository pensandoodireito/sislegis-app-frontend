angular.module('sislegisapp').factory('TarefaResource', function($resource, BACKEND) {
	var resource = $resource(BACKEND + '/tarefas/:TarefaId', {
		TarefaId : '@id'
	}, {
		'queryAll' : {
			method : 'GET',
			isArray : true
		},
		'query' : {
			method : 'GET',
			isArray : false
		},
		'buscarPorUsuario' : {
			url : BACKEND + "/tarefas/usuario",
			method : 'GET',
			isArray: true
		},			
		'update' : {
			method : 'PUT'
		}
	});
	return resource;
});
