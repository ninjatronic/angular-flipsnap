(function () {
    'use strict';

    angular
        .module('flipsnap')
        .directive('flipsnap', [function() {
            return {

                restrict: 'E',
                scope: {
                    width: '='
                },

                templateUrl: 'html/flipsnap-template.html',
                controller: 'flipsnap.controller',

                transclude: true,

                compile: function(element, attr, linker) {
                    return function($scope, $element, $attr) {

                        $scope.id = $attr.id;

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

                        // contains the repeated elements
                        var elements = [];

                        // watch the collection on the source scope
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
                                    var template = angular.element($clone[1]);
                                    template.attr('style', 'width:'+$attr.width+'px;float:left;');
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
                    }
                }
            };
        }])

})();