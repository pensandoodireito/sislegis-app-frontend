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
                            if(item.posicionamentoAtual && item.posicionamentoAtual.preliminar){
                                var prevPosicionamento = 'Previamente ' + item.posicionamentoAtual.posicionamento.nome;
                                jsonParse[index].posicionamentoAtual.posicionamento.nome = prevPosicionamento;
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
