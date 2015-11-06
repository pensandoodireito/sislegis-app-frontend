angular.module('sislegisapp').factory(
		'TipoEncaminhamentoResource',
		function($resource, BACKEND) {
			var resource = $resource(BACKEND + '/tiposencaminhamentos/:TipoEncaminhamentoId',
					{
                        TipoEncaminhamentoId : '@id'
					}, {
						'queryAll' : {
							method : 'GET',
							isArray : true
						},
						'query' : {
							method : 'GET',
							isArray : false
						},
						'update' : {
							method : 'PUT'
						}
					});
			return resource;
		});
