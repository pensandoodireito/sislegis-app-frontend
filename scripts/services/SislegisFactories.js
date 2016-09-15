angular.module('sislegisapp').factory('AreaMeritoResource', function ($resource, BACKEND) {
    var resource = $resource(BACKEND + '/areamerito/:id', {
        id: '@id'
    }, {


        });
    return resource;
});
