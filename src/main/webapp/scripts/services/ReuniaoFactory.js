angular.module('sislegisapp').factory('ReuniaoResource', function($resource){
    var resource = $resource('rest/reuniaos/:ReuniaoId',{ReuniaoId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});