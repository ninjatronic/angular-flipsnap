(function () {
    'use strict';

    angular
        .module('flipsnap', [])
        .directive('flipsnap', ['$window', function($window) {

            return {
                transclude: true,
                restrict: 'A',
                scope: {

                },
                template: '<div ng-transclude></div>',
                link: function($scope, $element, $attrs, $controller, $transclude) {

                    var $flipsnap = angular.element($element.children()[0]);
                    var id = $attrs.flipsnapId;

                    function isFlipsnapPane(element) {
                        var attr = element.attr('flipsnap-pane');
                        return attr != undefined || attr != null;
                    }

                    var totalWidth = 0;
                    angular.forEach($flipsnap.children(), function(child) {
                        child = angular.element(child);
                        if(isFlipsnapPane(child)) {
                            totalWidth += child[0].offsetWidth;
                            child.css('float', 'left');
                        }
                    });

                    $element.css('overflow', 'hidden');
                    $flipsnap.css('width', (totalWidth)+'px');
                    $flipsnap.attr('id', id);

                    $scope.flipsnap = $window.Flipsnap('#'+id);
                }
            };

        }]);

})();