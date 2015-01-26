/**
 * Tags filter of Proposicoes
 */
angular.module('sislegisapp').filter('selectedTags', function() {
    return function(proposicoes, tags) {
        return proposicoes.filter(function(p) {
        	
        	if(angular.isUndefined(tags) || tags.length < 1)
        		return true;

            for (var i in p.tags) {
            	for (var j = 0; j < tags.length; j++) {
            		if(p.tags[i].text ==  tags[j].id)
            			return true;
				}
            }
            return false;

        });
    };
});