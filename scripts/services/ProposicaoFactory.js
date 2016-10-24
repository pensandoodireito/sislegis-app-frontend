angular.module('sislegisapp').factory('ProposicaoResource', function ($resource, BACKEND) {
    var resource = $resource(BACKEND + '/proposicaos/:ProposicaoId', {
        ProposicaoId: '@id',
        origem: '@origem',
        sigla: '@sigla',
        ano: '@ano',
        numero: '@numero'

    }, {
            'queryAll': {
                method: 'GET',
                isArray: true
            },
            'query': {
                method: 'GET',
                isArray: false
            },
            'update': {
                method: 'PUT'
            },
            'salvarProposicoes': {
                url: BACKEND + "/proposicaos/salvarProposicoes",
                method: 'POST'
            },
            'salvarProposicoesDePauta': {
                url: BACKEND + "/proposicaos/salvarProposicoesDePauta",
                method: 'POST'
            },
            'salvarProposicaoIndependente': {
                url: BACKEND + "/proposicaos/salvarProposicaoExtra",
                method: 'POST'
            },
            'salvarProposicoesExtras': {
                url: BACKEND + "/proposicaos/salvarProposicoesExtras",
                method: 'POST'
            },
            'salvarProposicoesGenericas': {
                url: BACKEND + "/proposicaos/salvarProposicoesGenericas",
                isArray: true,
                method: 'POST'
            },

            'buscarCamara': {
                url: BACKEND + "/proposicaos/proposicoesPautaCamara",
                method: 'GET',
                isArray: true
            },
            'buscarSenado': {
                url: BACKEND + "/proposicaos/proposicoesPautaSenado",
                method: 'GET',
                isArray: true
            },
            'buscarPorSufixo': {
                url: BACKEND + "/proposicaos/buscarPorSufixo",
                method: 'GET',
                isArray: true
            },
            'consultar': {
                url: BACKEND + "/proposicaos/consultar",
                method: 'GET',
                isArray: true
            },
            'followProposicao': {
                url: BACKEND + "/proposicaos/follow/:ProposicaoId",
                method: 'POST'
            },
            'unfollowProposicao': {
                url: BACKEND + "/proposicaos/follow/:ProposicaoId",
                method: 'DELETE'
            },
            'syncManually': {
                url: BACKEND + "/proposicaos/check4updates/:ProposicaoId",
                method: 'POST'
            },
            'alterarPosicionamento': {
                url: BACKEND + "/proposicaos/alterarPosicionamento",
                method: 'POST'
            },
            'buscarPautas': {
                url: BACKEND + "/proposicaos/:ProposicaoId/pautas",
                method: 'GET',
                isArray: true
            },
            'listaRevisoes': {
                url: BACKEND + "/proposicaos/:ProposicaoId/revisaoMerito",
                method: 'GET',
                isArray: true
            },
            'removeAnexoRevisao': {
                url: BACKEND + "/proposicaos/:ProposicaoId/revisaoMerito/:RevisaoId/anexo",
                method: 'DELETE',
                isArray: false
            },
            'removeRevisao': {
                url: BACKEND + "/proposicaos/:ProposicaoId/revisaoMerito/:RevisaoId",
                method: 'DELETE',
                isArray: false
            },
            'salvarRevisao': {
                url: BACKEND + "/proposicaos/:ProposicaoId/revisaoMerito",
                method: 'POST',
                isArray: false
            },
            'buscaAutor': {
                url: BACKEND + "/proposicaos/autores",
                method: 'GET',
                isArray: true
            },
            'buscaRelator': {
                url: BACKEND + "/proposicaos/relatores",
                method: 'GET',
                isArray: true
            },
            'listaAreaMerito': {
                url: BACKEND + "/areamerito",
                method: 'GET',
                isArray: true
            },
            'listNotaTecnicas': {
                url: BACKEND + "/proposicaos/:ProposicaoId/notatecnica",
                method: 'GET',
                isArray: true
            },
            'listDocRelated': {
                url: BACKEND + "/proposicaos/:ProposicaoId/docrelated/:type",
                method: 'GET',
                isArray: true
            },
            'salvaNota': {
                url: BACKEND + "/proposicaos/:ProposicaoId/notatecnica",
                method: 'POST',
                isArray: false
            },
            'removeDoc': {
                url: BACKEND + "/proposicaos/:ProposicaoId/docrelated/:type/:docId",
                method: 'DELETE',
                isArray: false
            },

            'buscarAvulsas': {
                url: BACKEND + "/proposicaos/buscaIndependente/:origem/:sigla/:ano",
                method: 'GET',
                isArray: true,
                __transformResponse: function (data) {

                    var jsonRes = JSON.parse(data);
                    var dataAtual = new Date().getTime();
                    var itens = [];

                    jsonRes.forEach(function (item) {

                        var newItem = {};

                        newItem.codigoReuniao = null;
                        newItem.comissao = "AVULSA";
                        newItem.data = dataAtual;
                        newItem.id = null;
                        newItem.linkPauta = null;
                        newItem.manual = true;
                        newItem.origem = item.origem;
                        newItem.situacao = null;
                        newItem.tipo = null;
                        newItem.titulo = "Proposições avulsas";

                        var proposicao = {};

                        proposicao.ano = item.ano;
                        proposicao.comissao = null;
                        proposicao.ementa = item.ementa;
                        proposicao.idProposicao = item.idProposicao;
                        proposicao.linkProposicao = item.linkProposicao;
                        proposicao.numero = item.numero;
                        proposicao.origem = item.origem;
                        proposicao.sigla = item.sigla;
                        proposicao.tipo = item.tipo;

                        var pauta = {};
                        pauta.ordemPauta = 1;
                        pauta.pautaReuniaoComissao = null;
                        pauta.pautaReuniaoComissaoId = null;
                        pauta.proposicao = proposicao;
                        pauta.proposicaoId = null;
                        pauta.relator = null;
                        pauta.resultado = null;

                        newItem.proposicoesDaPauta = [pauta];

                        itens.push(newItem);

                    });

                    return itens;
                }
            }

        });
    return resource;
});
