angular.module('sislegisapp').controller('UploadController',
		function($scope, $http, FileUploader) {

			// Essa parte vai na controladora da 
			$scope.uploader = new FileUploader( {
			    url: 'http://localhost:8080/sislegis/rest/upload',
			    autoUpload : 'true',
			    onSuccessItem : function(item, response, status, headers) {
			    	console.log(response);
			    }
			});
			
		});