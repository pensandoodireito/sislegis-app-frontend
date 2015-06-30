angular.module('sislegisapp').factory('ComentarioService', function($q, ComentarioResource, UsuarioResource) {
	return {
		'save': function(comentario, idProposicao) {
			var deferred = $q.defer();
			comentario = new ComentarioResource(comentario);
	    	//TODO mock
	    	UsuarioResource.get({UsuarioId:999},function(data){
    			comentario.autor = data;
	    		comentario.dataCriacao = new Date();
	    		comentario.idProposicao = idProposicao;
	    		
	    		ComentarioResource.save(comentario, function(data,responseHeaders) {
	    			deferred.resolve(data,responseHeaders);
				}, 
				function(error) {
					deferred.reject(error);
				});
	    	});
	    	return deferred.promise;
		}
	};
});
