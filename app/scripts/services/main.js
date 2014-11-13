'use strict';

angular.module('2048GridApp.services', [])
  .service('Game', function() {
    this.tiles = [];

    this.addTile = function(tile) {
      this.tiles.push(tile);
    };

  })
  .factory('Tile', function() {

    var Tile = function(pos, val) {
      this.x     = pos.x;
      this.y     = pos.y;
      this.value = val || 2;
    };

    Tile.prototype.setPosition = function(pos) {
      this.x = pos.x;
      this.y = pos.y;
    }

    return Tile;

  });
