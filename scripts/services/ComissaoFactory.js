angular.module('sislegisapp').factory('ComissaoResource', function($resource){
    var resource = $resource('http://localhost:8080/sislegis/rest/comissaos/:ComissaoId',{ComissaoId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});
