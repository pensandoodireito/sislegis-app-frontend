angular.module('sislegisapp').factory('AreaMeritoResource', function ($resource, BACKEND) {
    var resource = $resource(BACKEND + '/areamerito/:id', {
        id: '@id'
    }, {


        });
    return resource;
}).service('DashboardService', function ($http, $q, $resource, BACKEND) {
    return $resource(BACKEND + '/dashboard');

});
