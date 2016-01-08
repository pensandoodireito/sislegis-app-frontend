angular.module('sislegisapp').factory(
		'PosicionamentoResource',
		function($resource, BACKEND) {
			var resource = $resource(BACKEND + '/posicionamentos/:PosicionamentoId',
					{
						PosicionamentoId : '@id',
					}, {
						'queryAll' : {
							method : 'GET',
							isArray : true,
                            transformResponse : function(data){
                                var json = JSON.parse(data);
                                angular.forEach(json, function(value, key){
                                    var newValue = angular.copy(value);
                                    newValue.nome = 'Previamente '+newValue.nome;
                                    json.push(newValue);
                                });
                                return json;
                            }
						},
						'query' : {
							method : 'GET',
							isArray : false
						},
						'update' : {
							method : 'PUT'
						},
                        'historicoPosicionamentos' : {
                            url : BACKEND + "/proposicaos/historicoPosicionamentos/:ProposicaoId",
                            method : 'GET',
                            isArray: true,
                            transformResponse : function(data){
                                var json = JSON.parse(data);
                                angular.forEach(json, function(value, key){
                                    var newValue = angular.copy(value);
                                    newValue.nome = 'Previamente '+newValue.nome;
                                    json.push(newValue);
                                });
                                return json;
                            }
                        }
					});
			return resource;
		});
