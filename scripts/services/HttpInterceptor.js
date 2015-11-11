// register the interceptor as a service
angular.module('sislegisapp').factory('HttpInterceptor', function($q, $rootScope) {
	
	var showSpinner = function(config){
		return !$rootScope.inactivateSpinner &&
			config && config.url && config.url.search('rest') >= 0 && 
			config.url.search('/tags') < 0 && config.url.search('/find') < 0 
			&& config.url.search('/notificacao/marcarVisualizadas')<0;
	}
	
	return {
		'request' : function(config) {
			if (showSpinner(config))
		        $('#pleaseWaitDialog').modal();
			return config;
		},

		'requestError' : function(rejection) {
			if (showSpinner(config))
                $('#pleaseWaitDialog').modal();
			/*
             @todo recovering code if possible
			if (canRecover(rejection)) {
				return responseOrNewPromise
			}*/
			return $q.reject(rejection);
		},

		'response' : function(response) {
            $('#pleaseWaitDialog').modal('hide');
			return response;
		},

		'responseError' : function(rejection) {
            $('#pleaseWaitDialog').modal('hide');
            /*
            @todo recovering code if possible
			if (canRecover(rejection)) {
				return responseOrNewPromise
			}*/
			return $q.reject(rejection);
		}
	};
});
