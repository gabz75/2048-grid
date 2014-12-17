'use strict';

angular.module('2048GridApp.directives', [])
  .directive('grid', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        ngModel: '='
      },
      templateUrl: 'views/grid.html'
    };
  })
  .directive('tile', function() {
    return {
      restrict: 'A',
      scope: {
        ngModel: '='
      },
      templateUrl: 'views/tile.html'
    };
  });