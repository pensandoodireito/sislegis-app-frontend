'use strict';

angular.module('sislegisapp').filter('startFrom', function() {
    return function(input, start) {
    	 if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    };
});