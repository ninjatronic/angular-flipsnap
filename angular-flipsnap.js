(function () {
    'use strict';

    angular
        .module('flipsnap', [])
        .directive('flipsnap', [function() {
            return {

                restrict: 'A',
                scope: {
                    width: '='
                },

                template: '<div ng-style="scrollerStyle" id="{{id}}FlipsnapJsTarget"><div style="float:left;" ng-transclude></div></div>',

                controller: ['$window', '$scope', '$timeout', function ($window, $scope, $timeout) {

                    $scope.$watch('width', rebind);
                    $scope.$watch('size', rebind);
                    $scope.$watch('id', rebind);

                    function rebind() {
                        var width = parseInt($scope.width);
                        var size = parseInt($scope.size);

                        $scope.scrollerStyle = {
                            width: (width*size) + 'px',
                            padding: '0'
                        };

                        $timeout(function() {
                            $scope.$parent[$scope.flipsnap] = $window.Flipsnap('#'+$scope.id+'FlipsnapJsTarget');
                        }, 1);
                    }

                }],

                transclude: true,

                compile: function(element, attr, linker) {
                    return function($scope, $element, $attr) {

                        var $viewport = $element[0];
                        var $scroller = $viewport.children[0];

                        // set the attributes on the scope
                        $scope.id = $attr.id;
                        $scope.width = parseInt($attr.width);
                        $scope.flipsnap = $attr.flipsnap;

                        // parse the repeat expression
                        var match = $attr.repeat.match(/^\s*(.+)\s+in\s+(.*?)\s*$/);
                        var $index = match[1];
                        var $collection = match[2];

                        // walk the DOM to find the transcluding template and it's container
                        var $transcluder = $element[0];
                        var $container = $transcluder;
                        while(!$transcluder.attributes.getNamedItem('ng-transclude')) {
                            $container = $transcluder;
                            $transcluder = $transcluder.children[0];
                        }
                        $container = angular.element($container);

                        // watch the collection on the source scope
                        var elements = [];
                        $scope.$parent.$watchCollection($collection, function(collection) {

                            // if elements are rendered, remove and destroy
                            angular.forEach(elements, function(element) {
                                element.el.remove();
                                element.scope.$destroy();
                            });
                            elements = [];

                            // handle an undefined collection
                            if(!collection) {
                                return;
                            }

                            $scope.size = collection.length;

                            // clone the transcluded template and repeat
                            angular.forEach(collection, function(item) {
                                var $child = $scope.$new();
                                $child[$index] = item;
                                linker($child, function($clone) {
                                    var template = angular.element($clone[1])[0];

                                    template.style.width = template.style.width || $attr.width+'px';
                                    template.style.float = 'left';

                                    $container.append($clone);
                                    elements.push({
                                        el: $clone,
                                        scope: $child
                                    });
                                });
                            });

                            // remove the redundant empty transclude template
                            $transcluder.remove();
                        });

                        $viewport.style.width = $viewport.style.width || $scope.width + 'px';
                        $viewport.style.overflow = 'hidden';

                        $scroller.style.width = ($scope.width*$scope.size) + 'px';
                        $scroller.style.padding = '0';
                    }
                }
            };
        }])

})();