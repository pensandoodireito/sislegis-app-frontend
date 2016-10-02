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
}).directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    }
}])