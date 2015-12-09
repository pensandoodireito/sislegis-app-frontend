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
		},
        'finalizar': {
            method: 'POST',
            url: BACKEND + "/tarefas/finalizar",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            transformRequest: function(data, headersGetter){
                return $.param({idTarefa: data.id, descricaoComentario: data.comentarioFinalizacao});
            }
        }
	});
	return resource;
});
