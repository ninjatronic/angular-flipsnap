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
                    var name = $attrs.flipsnap;
                    var id = $attrs.flipsnapId;
                    var options = $parse($attrs.flipsnapOptions)($scope.$parent);

                    var hiddenReset = $flipsnap[0].hidden;
                    $flipsnap[0].hidden = true;

                    var repeatWatchers = {};
                    var optionsWatch;

                    function hasAttribute(element, attrName) {
                        var attr = element.attr(attrName);
                        return attr != undefined || attr != null;
                    }

                    function isFlipsnapPane(element) {
                        return hasAttribute(element, 'flipsnap-pane');
                    }

                    function isNgRepeat(element) {
                        return hasAttribute(element, 'ng-repeat');
                    }

                    $scope.completeLayout = function() {
                        $flipsnap[0].hidden = hiddenReset;

                        var totalWidth = 0;
                        angular.forEach($flipsnap.children(), function(child) {
                            child = angular.element(child);

                            if(isFlipsnapPane(child)) {
                                totalWidth += child[0].offsetWidth;
                                child.css('float', 'left');
                            }

                            if(isNgRepeat(child)) {
                                var target = child.attr('ng-repeat').match(/in\s+(.+)/)[1];
                                if(!repeatWatchers[target]) {
                                    repeatWatchers[target] = $scope.$parent.$watch(target, function() {
                                        $timeout(function() {
                                            $scope.completeLayout();
                                            $scope.generateFlipsnap();
                                        });
                                    }, true);
                                }
                            }
                        });

                        $element.css('overflow', 'hidden');
                        $flipsnap.css('width', (totalWidth)+'px');
                        $flipsnap.attr('id', id);

                        optionsWatch = optionsWatch || $scope.$parent.$watch($attrs.flipsnapOptions, $scope.generateFlipsnap, true);
                    };

                    $scope.generateFlipsnap = function() {
                        var old = $scope.$parent[name];
                        $scope.$parent[name] = $window.Flipsnap('#'+id, options);
                        if(old) {
                            old.destroy();
                        }
                    };

                    $timeout($scope.completeLayout);
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