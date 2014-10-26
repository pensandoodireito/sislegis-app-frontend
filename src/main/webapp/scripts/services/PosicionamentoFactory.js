angular.module('sislegisapp').factory('PosicionamentoResource', function($resource){
    var resource = $resource('rest/posicionamentos/:PosicionamentoId',{PosicionamentoId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});