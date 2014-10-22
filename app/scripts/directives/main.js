'use strict';

angular.module('2048GridApp')
  .directive('grid', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/grid.html'
    };
  });