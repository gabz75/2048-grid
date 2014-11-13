'use strict';

angular.module('2048GridApp')
  .controller('MainCtrl', function ($scope, $document, Game, Tile) {

    $scope.game = Game;

    $scope.game.addTile(new Tile({ x: 0, y: 0}, 2));
    $scope.game.addTile(new Tile({ x: 1, y: 1}, 2));
    $scope.game.addTile(new Tile({ x: 2, y: 1}, 2));


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

    console.log($scope.game.tiles);

  });
