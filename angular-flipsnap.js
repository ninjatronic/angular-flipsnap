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
                link: function($scope, $element, $attrs) {

                    if(!$window.Flipsnap) {
                        $window.Flipsnap = function(matcher, options) { };
                    }

                    var $flipsnap = angular.element($element.children()[0]);
                    var $parent = $scope.$parent;

                    $attrs.flipsnapOptions = $attrs.flipsnapOptions || {};
                    $attrs.flipsnapId = $attrs.flipsnapId || 'flipsnap';
                    $attrs.flipsnap = $attrs.flipsnap || 'flipsnap';

                    var options = $parse($attrs.flipsnapOptions)($parent);
                    var name = $attrs.flipsnap;
                    var id = $attrs.flipsnapId;

                    var hiddenReset = $flipsnap[0].hidden;
                    $flipsnap[0].hidden = true;

                    var repeatWatchers = {};
                    var optionsWatch;

                    function hasAttribute(element, attrName) {
                        var attr = element.attr(attrName);
                        return (attr !== undefined) && (attr !== null);
                    }

                    function isFlipsnapPane(element) {
                        return hasAttribute(element, 'flipsnap-pane');
                    }

                    function isNgRepeat(element) {
                        return hasAttribute(element, 'ng-repeat');
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

                            if(isNgRepeat(child)) {
                                var target = child.attr('ng-repeat').match(/in\s+(.+)/)[1];
                                if(!repeatWatchers[target]) {
                                    repeatWatchers[target] = $parent.$watch(target, function() {
                                        $timeout(function() {
                                            completeLayout();
                                            generateFlipsnap();
                                        });
                                    }, true);
                                }
                            }
                        });

                        $element.css('overflow', 'hidden');
                        $flipsnap.css('width', (totalWidth)+'px');
                        $flipsnap.attr('id', id);

                        optionsWatch = optionsWatch || $parent.$watch($attrs.flipsnapOptions, generateFlipsnap, true);
                    }

                    function generateFlipsnap() {
                        var oldFlipsnap = $parent[name];

                        var newFlipsnap = $window.Flipsnap('#'+id, options);
                        newFlipsnap.element.addEventListener('mousemove', function(e) {
                            e.stopPropagation();
                        });
                        newFlipsnap.element.addEventListener('touchmove', function(e) {
                            e.stopPropagation();
                        });
                        $parent[name] = newFlipsnap;

                        updateFlipsnap();

                        if(oldFlipsnap) {
                            oldFlipsnap.destroy();
                        }
                    }

                    function updateFlipsnap() {
                        if($parent[name]) {
                            $parent[name].canMoveNext = $parent[name].hasNext();
                            $parent[name].canMovePrev = $parent[name].hasPrev();
                        }
                    }

                    $flipsnap.on('fspointmove', function() {
                        if($parent.$$phase) {
                            updateFlipsnap();
                        } else {
                            $scope.$apply(updateFlipsnap);
                        }
                    });

                    $timeout(completeLayout);
                }
            };

        }]);

})();