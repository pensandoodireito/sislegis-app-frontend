angular.module('sislegisapp').directive('focusMe', function ($timeout) {
    return {
        link: function (scope, element, attrs) {
            scope.$watch(attrs.focusMe, function (value) {
                if (value === true) {

                    $timeout(function () {
                        try {
                            element[0].focus();
                            scope[attrs.focusMe] = false;
                        } catch (e) {
                            console.log(e);
                        }
                    }, 100);
                }
            });
        }
    };
})