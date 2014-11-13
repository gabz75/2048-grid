'use strict';

angular.module('2048GridApp')
  .controller('MainCtrl', function ($scope, $document, Game, Tile) {

    $scope.game = Game;
    $scope.game.addTile(new Tile({ x: 0, y: 2}, 2));

    $document.bind('keydown', function(event) {
      switch(event.keyCode) {
        case 37:
          $scope.game.tiles[0].setPosition({ x:0, y: 0});
          $scope.$apply();
          break;
        case 38:
          $scope.game.tiles[0].setPosition({ x:0, y: 3});
          $scope.$apply();
          break;
        case 39:
          $scope.game.tiles[0].setPosition({ x:3, y: 0});
          $scope.$apply();
          break;
        case 40:
          $scope.game.tiles[0].setPosition({ x:3, y: 3});
          $scope.$apply();
          break;
      }


    });

    console.log($scope.game.tiles);

  });
