module.exports = function (io) {
  'use strict';

  var players = {};

  io.on('connection', function (socket) {

    for (var player in players) {
      socket.emit('join', players[player]);
    };

    socket.on('join', function(data) {
      if (data.uid && !players[data.uid]) {
        players[data.uid] = data;
      }

      socket.broadcast.emit('join', data);
    });

    socket.on('move', function(data) {
      socket.broadcast.emit('move', data);
    });

    socket.on('quit', function(data) {
      if (data.uid && players[data.uid]) {
        delete players[data.uid];
      }

      socket.broadcast.emit('quit', data);
    });

  });

};