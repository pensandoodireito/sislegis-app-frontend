angular.module('sislegisapp').factory('EncaminhamentoResource', function($resource){
    var resource = $resource('rest/encaminhamentos/:EncaminhamentoId',{EncaminhamentoId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});