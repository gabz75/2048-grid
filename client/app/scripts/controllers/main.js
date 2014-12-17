'use strict';

angular.module('2048GridApp')
  .controller('MainCtrl', function ($scope, $document, GenerateUniqueId, Game, KeyboardService) {

    var socket = io.connect('http://localhost:8000');

    $scope.uid = "player-" + GenerateUniqueId.next();
    $scope.game = new Game();
    $scope.game.start();
    $scope.competitors = {};

    socket.emit('join', {
      uid: $scope.uid,
      tiles: $scope.game.tiles
    });

    KeyboardService.init();
    KeyboardService.on(function(key) {
      $scope.game.move(key);
      socket.emit('move', { uid: $scope.uid, key: key });
    });

    socket.on('disconnect', function() {
      socket.emit('quit', { uid: $scope.uid });
    });

    // Listeners
    socket.on('join', function(data) {
      if (data.uid && data.tiles && !$scope.competitors[data.uid]) {
        console.log('init: ' + data.uid);
        $scope.competitors[data.uid] = new Game();
        $scope.competitors[data.uid].setTiles(data.tiles);
        $scope.$apply();
      }
    });

    socket.on('move', function(data) {
      if (data.uid && data.key && $scope.competitors[data.uid]) {
        $scope.competitors[data.uid].move(data.key);
      }
    });

    socket.on('quit', function(data) {
      if (data.uid && $scope.competitors[data.uid]) {
        delete $scope.competitors[data.uid]
        $scope.$apply();
      }
    });

  });
