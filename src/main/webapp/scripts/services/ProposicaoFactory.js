angular.module('sislegisapp').factory('ProposicaoResource', function($resource){
    var resource = $resource('rest/proposicaos/:ProposicaoId',{ProposicaoId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});