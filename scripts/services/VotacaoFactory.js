angular.module('sislegisapp').factory('VotacaoResource', function($resource, BACKEND) {
	var resource = $resource(BACKEND + '/proposicaos/listarVotacoes', {
        idProposicao : '@id'
	}, {
		'queryAll' : {
			method : 'GET',
            params: {
                tipo: "@tipo",
                numero: "@numero",
                ano: "@ano",
                origem: "@origem"
            },
			isArray : true
		}
	});
	return resource;
});
