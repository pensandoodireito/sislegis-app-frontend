angular.module('sislegisapp').factory(
		'SituacaoLegislativaFactory',
		function($resource, BACKEND) {
			var resource = $resource(BACKEND
					+ '/situacoes/:casa', {
				casa : '@casa'
			}, 
			   {
				'update' : {
					method : 'PUT',
					url: BACKEND	+ '/situacoes/:id'
				}
			   }
			);
			return resource;
		});
