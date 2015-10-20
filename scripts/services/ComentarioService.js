angular.module('sislegisapp').factory('ComentarioService', function($q, ComentarioResource, UsuarioResource) {
	return {
		'save' : function(comentario, idProposicao) {
			var deferred = $q.defer();
			comentario = new ComentarioResource(comentario);

			comentario.dataCriacao = new Date();
			comentario.proposicao = {
				id : idProposicao
			};

			ComentarioResource.save(comentario, function(data, responseHeaders) {
				if (data.id == null) {
					var loc = responseHeaders().location;
					var idCreated = loc.substr(loc.lastIndexOf('/') + 1);
					data.id = idCreated;
				}
				deferred.resolve(data, responseHeaders);
			}, function(error) {
				deferred.reject(error);
			});

			return deferred.promise;
		}
	};
});
