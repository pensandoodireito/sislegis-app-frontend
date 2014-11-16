angular.module('sislegisapp').factory('EquipeResource', function($resource){
    var resource = $resource('rest/equipes/:EquipeId',{EquipeId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});