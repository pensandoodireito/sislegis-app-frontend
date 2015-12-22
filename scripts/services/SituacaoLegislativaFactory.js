angular.module('sislegisapp').factory(
		'SituacaoLegislativaFactory',
		function($resource, BACKEND) {
			var resource = $resource(BACKEND
					+ '/situacoes/:casa', {
				casa : '@casa'
			});
			return resource;
		});
