angular.module('sislegisapp').controller('UploadController',
		function($scope, $http, FileUploader) {

			$scope.uploader = new FileUploader();

		});