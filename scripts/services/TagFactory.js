angular.module('sislegisapp').factory('TagResource', function ($resource, BACKEND) {
        return $resource(BACKEND + '/tags/:TagId', {
            TagId: '@id'
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
                'listarTodos': {
                    url: BACKEND + "/tags/listarTodos",
                    method: 'GET',
                    isArray: true
                },
                'tagsDropdownSelect': {
                    url: BACKEND + "/tags/listAllDropdownMultiple",
                    method: 'GET',
                    isArray: true
                },
                'buscarPorSufixo': {
                    url: BACKEND + "/tags/buscarPorSufixo",
                    method: 'GET',
                    isArray: true
                }
            });
    }).factory('TagResourceCache', function (TagResource, $rootScope) {
        $rootScope.allTags = TagResource.listarTodos();
        return {
            listarTodos:function(){
                return  $rootScope.allTags;
            }
        }
    });