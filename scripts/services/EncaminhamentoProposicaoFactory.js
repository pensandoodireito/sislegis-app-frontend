angular.module('sislegisapp').factory('EncaminhamentoProposicaoResource', function($resource, $http, BACKEND) {
	var resource = $resource(BACKEND + '/encaminhamentoProposicao/:EncaminhamentoProposicaoId', {
		ComentarioId : '@id'
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
		},
        'saveAtencaoEspecial':{
            method : 'POST',
            url : BACKEND + "/encaminhamentoProposicao/marcaAtencaoEspecial",
            isArray : false  
        },
        'saveDespachoPresencial':{
            method : 'POST',
            url : BACKEND + "/encaminhamentoProposicao/despachoPresencial",
            isArray : false
        },
		'findByProposicao' : {
			url : BACKEND + "/encaminhamentoProposicao/proposicao/:ProposicaoId",
			method : 'GET',
			isArray : true
		}
	});
	return resource;
});

angular.module('sislegisapp').factory('EncaminhamentoProposicaoHttp', function($http, BACKEND){
    return {
        finalizar: function(encaminhamento) {
            return $http({
                method: 'POST',
                url: BACKEND + "/encaminhamentoProposicao/finalizar",
                data: $.param({'idEncaminhamentoProposicao': encaminhamento.id, 'descricaoComentario': encaminhamento.descricaoComentario}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}
            });
        }
    };
});