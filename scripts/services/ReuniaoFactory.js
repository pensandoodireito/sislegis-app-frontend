angular.module('sislegisapp').factory('ReuniaoResource',
		function($resource, BACKEND) {
			return $resource(BACKEND + '/reuniaos/:ReuniaoId', {
				ReuniaoId : '@id'
			}, {
				'queryAll' : {
					method : 'GET',
					isArray : true
				},
				'query' : {
					method : 'GET',
					isArray : false
				},
				'buscarReuniaoPorData' : {
					url : BACKEND + "/reuniaos/findByData",
					method : 'GET',
					isArray : true,
                    transformResponse: function(data){
                        var jsonParse = JSON.parse(data);
                        jsonParse.forEach(function(item, index){
                            if(item.posicionamentoPreliminar==true){
                                jsonParse[index].posicionamento.nome = 'Previamente ' + item.posicionamentoAtual.posicionamento.nome;
                            }
                        });
                        return jsonParse;
                    }
				},				
				'update' : {
					method : 'PUT'
				}
			});
		});
