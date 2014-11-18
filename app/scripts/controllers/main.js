'use strict';

angular.module('2048GridApp')
  .controller('MainCtrl', function ($scope, $document, Game, Tile) {

    $scope.game = Game;

    $scope.game.setCellAt({ x: 0, y: 0}, new Tile({ x: 0, y: 0}, 2));
    $scope.game.setCellAt({ x: 1, y: 1}, new Tile({ x: 1, y: 1}, 4));
    $scope.game.setCellAt({ x: 3, y: 1}, new Tile({ x: 3, y: 1}, 4));

    $document.bind('keydown', function(event) {
      switch(event.keyCode) {
        case 37:
          $scope.game.move('left');
          $scope.$apply();
          break;
        case 38:
          $scope.game.move('up');
          $scope.$apply();
          break;
        case 39:
          $scope.game.move('right');
          $scope.$apply();
          break;
        case 40:
          $scope.game.move('down');
          $scope.$apply();
          break;
      }

    });


  });
