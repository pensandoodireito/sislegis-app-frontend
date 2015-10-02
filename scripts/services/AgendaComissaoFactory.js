angular.module('sislegisapp').factory('AgendaComissaoFactory',
		function($resource, BACKEND) {
			var resource = $resource(BACKEND + '/agendacomissao/:comissao', {
				comissao : '@comissao'
			}, {
				'listSeguidas' : {
					method : 'GET',
					isArray : true
				},
				'query' : {
					method : 'GET',
					isArray : false
				},
				'follow' : {
					method : 'POST'
				},
				'unfollow' : {
					method : 'DELETE'
				}
			});
			return resource;
		});
