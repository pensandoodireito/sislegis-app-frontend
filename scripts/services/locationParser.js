angular.module('sislegisapp').value('locationParser', function(responseHeaders){
    // Get the Location header and parse it.
    var locationHeader = responseHeaders('Location');
    if(locationHeader==null || locationHeader==''){
        throw "Header 'location' nao encontrado. Possivelmente 'Access-Control-Expose-Headers' não está habilitando location para ser visivel.";
    }
    var fragments = locationHeader.split('/');
    var id = fragments[fragments.length -1];
    return id;
});