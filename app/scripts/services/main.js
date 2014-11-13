'use strict';

angular.module('2048GridApp.services', [])
  .service('Game', function() {
    this.tiles = [];

    var vectors = {
      'left': { x: -1, y: 0 },
      'right': { x: 1, y: 0 },
      'up': { x: 0, y: -1 },
      'down': { x: 0, y: 1 }
    };

    this.addTile = function(tile) {
      this.tiles.push(tile);
    };

    this.move = function(key) {
      var _this = this;

      this.tiles.forEach(function(tile) {
        _this.moveToNextPosition(tile, vectors[key]);
      });

    };

    this.getTileAt = function(tile, vector) {
      var tileAt = null;

      this.tiles.forEach(function(_tile) {
        if (tile.x + vector.x === _tile.x && tile.y + vector.y === _tile.y) {
          tileAt = _tile;
        }
      });

      return tileAt;
    };

    this.moveToNextPosition = function(tile, vector) {
      while(tile.canMoveTo(vector) && this.getTileAt(tile, vector) === null) {
        tile.move(vector);
      }
    };

    this.positionToCoordinates = function(i) {
      var x = i % 4,
          y = (i - x) / 4;
      return {
        x: x,
        y: y
      };
    };

    /*
     * Helper to convert coordinates to position
     */
    this.coordinatesToPosition = function(pos) {
      return (pos.y * 4) + pos.x;
    };

  })
  .factory('Tile', function() {

    var Tile = function(pos, val) {
      this.x     = pos.x;
      this.y     = pos.y;
      this.value = val || 2;
    };

    Tile.prototype.printPosition = function() {
      console.log('x: ' + this.x + ', y: ' + this.y);
    };

    Tile.prototype.setPosition = function(pos) {
      this.x = pos.x;
      this.y = pos.y;
    };

    Tile.prototype.move = function(vector) {
      this.x = this.x + vector.x;
      this.y = this.y + vector.y;
    };

    Tile.prototype.canMoveTo = function(vector) {
      var newX = this.x + vector.x;
      var newY = this.y + vector.y;

      return (newX >= 0 && newX <= 3 && newY >= 0 && newY <= 3);
    };

    return Tile;

  });
