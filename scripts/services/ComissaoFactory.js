angular.module('sislegisapp')
    .factory('ComissaoResource', function ($resource, BACKEND) {
        var resource = $resource(BACKEND + '/comissaos/:ComissaoId', { ComissaoId: '@id' }, {
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
            'fetchComissoesCamara': {
                url: BACKEND + '/comissaos/comissoesCamara',
                method: 'GET',
                isArray: true
            },
            'fetchComissoesSenado': {
                url: BACKEND + '/comissaos/comissoesSenado',
                method: 'GET',
                isArray: true
            }
        });
        return resource;
    }).service('ComissaoService', function (ComissaoResource) {
        var cache = {
            senado: null,
            camara: null
        }
        return {

            getComissoesSenado: function () {
                if (cache.senado != null) {
                    return cache.senado;
                }
                return ComissaoResource.fetchComissoesSenado({}, function (data) { cache.senado = data; });
            },
            getComissoesCamara: function () {
                if (cache.camara != null) {
                    return cache.camara;
                }
                return ComissaoResource.fetchComissoesCamara({}, function (data) { cache.camara = data; });
            }
        };
    });
