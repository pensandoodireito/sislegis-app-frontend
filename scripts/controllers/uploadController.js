angular.module('sislegisapp').controller('UploadController',
		function($scope, $http, FileUploader, BACKEND) {

			// Essa parte vai na controladora da 
			$scope.uploader = new FileUploader( {
			    url: BACKEND + '/upload',
			    autoUpload : 'true',
			    onSuccessItem : function(item, response, status, headers) {
			    	console.log(response);
			    }
			});
			
		});
