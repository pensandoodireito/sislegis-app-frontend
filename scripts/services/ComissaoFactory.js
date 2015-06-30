angular.module('sislegisapp').factory('ComissaoResource', function($resource){
    var resource = $resource('../rest/comissaos/:ComissaoId',{ComissaoId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});
