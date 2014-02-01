(function () {
    'use strict';

    angular
        .module('flipsnap')
        .controller('flipsnap.controller', ['$window', '$scope', '$timeout', function ($window, $scope, $timeout) {
            
            $scope.$watch('width', updateStyles);
            $scope.$watch('size', updateStyles);

            function updateStyles() {
                var width = parseInt($scope.width);
                var size = parseInt($scope.size);

                $scope.viewportStyle = {
                    width: width + 'px',
                    overflow: 'hidden'
                };
                $scope.scrollerStyle = {
                    width: (width*size) + 'px',
                    padding: '0'
                };
                $timeout(function() {
                    $window.Flipsnap('#'+$scope.id+'FlipsnapJsTarget');
                }, 1);
            }

        }]);
})();