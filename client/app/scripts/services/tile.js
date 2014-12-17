'use strict';

angular.module('2048GridApp.services.tile', [])
  .factory('Tile', function(GenerateUniqueId) {

    var Tile = function(pos, val) {
      this.x     = pos.x;
      this.y     = pos.y;
      this.value = val || 2;
      this.moved = false;

      this.id = GenerateUniqueId.next();
    };

    Tile.prototype.markUnmoved = function() {
      this.moved = false;
    };

    Tile.prototype.setPosition = function(pos) {
      this.x = pos.x;
      this.y = pos.y;
      this.moved = true;
    };

    Tile.prototype.newPosition = function(vector) {
      return { x: this.x + vector.x, y: this.y + vector.y };
    };

    Tile.prototype.currentPosition = function() {
      return { x: this.x, y: this.y };
    };

    return Tile;

  });