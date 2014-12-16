'use strict';

angular.module('2048GridApp')
  .controller('MainCtrl', function ($scope, $document, socket, Game, KeyboardService) {

    $scope.game = Game;
    $scope.game.start()

    KeyboardService.init();
    KeyboardService.on(function(key) {
      $scope.game.move(key);
    });

    socket.on('init', function (data) {
      console.log(data);
    });

  });
