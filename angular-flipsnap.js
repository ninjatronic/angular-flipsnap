(function () {
    'use strict';

    angular
        .module('flipsnap', [])
        .directive('flipsnap', ['$window', '$parse', '$timeout', function($window, $parse, $timeout) {

            return {
                transclude: true,
                restrict: 'A',
                scope: { },
                template: '<div ng-transclude></div>',
                link: function($scope, $element, $attrs, $controller, $transclude) {

                    var $flipsnap = angular.element($element.children()[0]);
                    var id = $attrs.flipsnapId;
                    var options = $parse($attrs.flipsnapOptions)($scope.$parent);

                    var hiddenReset = $flipsnap[0].hidden;
                    $flipsnap[0].hidden = true;

                    function hasAttribute(element, attrName) {
                        var attr = element.attr(attrName);
                        return attr != undefined || attr != null;
                    }

                    function isFlipsnapPane(element) {
                        return hasAttribute(element, 'flipsnap-pane');
                    }

                    function completeLayout() {
                        $flipsnap[0].hidden = hiddenReset;

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

                        $scope.$parent.$watch($attrs.flipsnapOptions, function(newValue) {
                            console.log(newValue);
                            $scope.$parent.flipsnap = $window.Flipsnap('#'+id, options);
                        }, true);
                    }

                    $timeout(completeLayout);
                }
            };

        }])
        .directive("onRepeatDone", function() {
            return {
                restriction: 'A',
                link: function($scope, $element, $attrs, $controller, $transclude) {
                    $scope.$emit($attrs["onRepeatDone"] || "repeatDone", $element);
                }
            }
        });

})();