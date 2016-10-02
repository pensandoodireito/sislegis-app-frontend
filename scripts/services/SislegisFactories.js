angular.module('sislegisapp').factory('AreaMeritoResource', function ($resource, BACKEND) {
    var resource = $resource(BACKEND + '/areamerito/:id', {
        id: '@id'
    }, {


        });
    return resource;
}).service('DashboardService', function ($http, $q, $resource, BACKEND) {
    return $resource(BACKEND + '/dashboard');

})
    .factory('UploadService', ['$http', '$q', '$resource', 'BACKEND', function ($http, $q, $resource, BACKEND) {
        return function (actionUrl, file, params) {
            var deferred = $q.defer();
            console.log('file is ');
            console.dir(file);
            var fd = new FormData();

            fd.append('file', file);
            for (var property in params) {
                if (params.hasOwnProperty(property)) {
                    fd.append(property, params[property]);
                }
            }
            var back = BACKEND.substr(0, BACKEND.length - 5);
            $http.post(back + "/" + actionUrl, fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                },
                responseType: "json"
            }).then(function (data, arg2) {
                if (data.data == null) {
                    deferred.reject(data);
                } else {
                    if (data.data.status != true) {
                        deferred.reject(data.data);
                    } else {
                        deferred.resolve(data.data.payload);
                    }
                }

            }, function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        };
    }]);
