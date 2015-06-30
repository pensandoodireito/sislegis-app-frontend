angular.module('sislegisapp').factory('TagResource',
		function($resource) {
			return $resource('http://localhost:8080/sislegis/rest/tags/:TagId', {
				TagId : '@id'
			}, {
				'queryAll' : {
					method : 'GET',
					isArray : true
				},
				'query' : {
					method : 'GET',
					isArray : false
				},				
				'update' : {
					method : 'PUT'
				},
				'listarTodos' : {
					url : "http://localhost:8080/sislegis/rest/tags/listarTodos",
					method : 'GET',
					isArray : true
				},				
				'tagsDropdownSelect' : {
					url : "http://localhost:8080/sislegis/rest/tags/listAllDropdownMultiple",
					method : 'GET',
					isArray : true
				},					
				'buscarPorSufixo' : {
					url : "http://localhost:8080/sislegis/rest/tags/buscarPorSufixo",
					method : 'GET',
					isArray : true
				}
			});
		});
