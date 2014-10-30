// register the interceptor as a service
angular.module('sislegisapp').factory('HttpInterceptor', function($q) {
	return {
		'request' : function(config) {
			if (config && config.url && config.url.search('rest') >= 0)
		        $('#spinner').show();
			return config;
		},

		'requestError' : function(rejection) {
			if (config && config.url && config.url.search('rest') >= 0)
		        $('#spinner').show();
			if (canRecover(rejection)) {
				return responseOrNewPromise
			}
			return $q.reject(rejection);
		},

		'response' : function(response) {
	        $('#spinner').hide();
			return response;
		},

		'responseError' : function(rejection) {
	        $('#spinner').hide();
			if (canRecover(rejection)) {
				return responseOrNewPromise
			}
			return $q.reject(rejection);
		}
	};
});
