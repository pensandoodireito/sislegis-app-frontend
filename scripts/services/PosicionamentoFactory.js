angular.module('sislegisapp').factory(
		'PosicionamentoResource',
		function($resource, BACKEND) {
			var resource = $resource(BACKEND + '/posicionamentos/:PosicionamentoId',
					{
						PosicionamentoId : '@id'
					}, {
						'queryAll' : {
							method : 'GET',
							isArray : true,
                            transformResponse : function(data, headersGetter){
                                var json = JSON.parse(data);
                                angular.forEach(json, function(value, key){
                                    var newValue = angular.copy(value);
                                    newValue.nome = 'Previamente '+newValue.nome;
                                    json.push(newValue);
                                });
                                console.log(json);
                                return json;
                            }
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
