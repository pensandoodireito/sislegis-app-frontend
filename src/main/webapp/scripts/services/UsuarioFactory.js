angular.module('sislegisapp').factory('UsuarioResource', function($resource){
    var resource = $resource('rest/usuarios/:UsuarioId',{UsuarioId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});