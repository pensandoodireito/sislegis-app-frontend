angular.module('sislegisapp').factory('TarefaResource', function($resource) {
	var resource = $resource('http://localhost:8080/sislegis/rest/tarefas/:TarefaId', {
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
			url : "http://localhost:8080/sislegis/rest/tarefas/usuario",
			method : 'GET',
			isArray: true
		},			
		'update' : {
			method : 'PUT'
		}
	});
	return resource;
});