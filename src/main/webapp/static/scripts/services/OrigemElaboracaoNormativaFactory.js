angular.module('sislegisapp').factory('OrigemElaboracaoNormativaResource', function($resource){
    var resource = $resource('../rest/origemelaboracaonormativas/:OrigemElaboracaoNormativaId',{OrigemElaboracaoNormativaId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});