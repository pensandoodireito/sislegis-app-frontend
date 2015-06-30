angular.module('sislegisapp').factory('TarefaResource', function($resource) {
	var resource = $resource('../rest/tarefas/:TarefaId', {
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
			url : "../rest/tarefas/usuario",
			method : 'GET',
			isArray: true
		},			
		'update' : {
			method : 'PUT'
		}
	});
	return resource;
});