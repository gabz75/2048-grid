'use strict';

angular.module('2048GridApp.services.game', [])
  .factory('Game', ['$q', 'Tile', function($q, Tile) {

    var Game = function() {
      this.tiles = [];
      this.model = [];
      this.size  = 4;
      this.end   = false;
      this.vectors = {
        'left': { x: -1, y: 0 },
        'right': { x: 1, y: 0 },
        'up': { x: 0, y: -1 },
        'down': { x: 0, y: 1 }
      };
    }

    Game.prototype.start = function() {
      this.generateRandomTile();
      this.generateRandomTile();
    };

    Game.prototype.setTiles = function(t) {
      this.tiles = t;
    }

    Game.prototype.move = function(key) {
      if (this.end) {
        return;
      }

      var self = this;
      var positions = self.traversalDirections(key);
      var p = function() {
        positions.x.forEach(function(x) {
          positions.y.forEach(function(y) {

            var tile = self.getCellAt({x: x, y: y });

            if (tile && tile.moved === false) {

              // Attempt to merge the closest cell if there is a match
              var merged = self.calculateMerge(tile, key);
              if (merged) {
                tile = merged;
              }

              // Otherwise move the tile to the right direction
              var newPosition = self.calculateNextPosition(tile, key);

              if (newPosition) {
                self.moveTile(tile, newPosition);
              }
            }

          });
        });

        if (self.availablePositions().length === 0) {
          return false;
        }

        // End of the a turn, we reset the move attribute of each tile
        self.tiles.forEach(function(tile) {
          if (tile) {
            tile.markUnmoved();
          }
        });

        // Generate a new tile
        if (!self.end) {
          self.generateRandomTile();
        }

        return true;
      };

      return $q.when(p());
    };

    Game.prototype.traversalDirections = function(key) {
      var vector = this.vectors[key];
      var positions = {x: [], y: []};
      for (var x = 0; x < this.size; x++) {
        positions.x.push(x);
        positions.y.push(x);
      }

      if (vector.x > 0) {
        positions.x = positions.x.reverse();
      }
      if (vector.y > 0) {
        positions.y = positions.y.reverse();
      }

      return positions;
    };

    Game.prototype.getCellAt = function(pos) {
      if (this.inGrid(pos)) {
        var x = this.coordinatesToPosition(pos);
        return this.tiles[x];
      } else {
        return null;
      }
    };

    Game.prototype.setCellAt = function(pos, tile) {
      if (this.inGrid(pos)) {
        var xPos = this.coordinatesToPosition(pos);
        this.tiles[xPos] = tile;
      }
    };

    Game.prototype.moveTile = function(tile, pos) {
      if (this.inGrid(pos)) {
        this.setCellAt(tile.currentPosition(), null);
        this.setCellAt(pos, tile);
        tile.setPosition(pos);
      }
    };

    Game.prototype.mergeTile = function(tileA, tileB) {
      this.setCellAt(tileA.currentPosition(), null);
      this.setCellAt(tileB.currentPosition(), null);

      var newTile = new Tile(tileA.currentPosition(), tileA.value * 2);
      this.setCellAt(tileA.currentPosition(), newTile);

      return newTile;
    };

    Game.prototype.calculateMerge = function(tile, key) {
      var vector            = this.vectors[key];
      var match             = null;
      var potentialPosition = { x: tile.x - vector.x, y: tile.y - vector.y };

      while(this.inGrid(potentialPosition)) {
        match = this.getCellAt(potentialPosition);

        if (match && tile.value === match.value) {
          return this.mergeTile(tile, match);
        }

        potentialPosition = { x: potentialPosition.x - vector.x, y: potentialPosition.y - vector.y };
      }

      return null;
    };

    Game.prototype.calculateNextPosition = function(tile, key) {
      var vector            = this.vectors[key];
      var nextPosition      = null;
      var potentialPosition = { x: tile.x + vector.x, y: tile.y + vector.y };

      while(this.inGrid(potentialPosition)) {
        if (this.getCellAt(potentialPosition) === undefined || this.getCellAt(potentialPosition) === null) {
          nextPosition = potentialPosition;
        }

        potentialPosition = { x: potentialPosition.x + vector.x, y: potentialPosition.y + vector.y };
      }

      return nextPosition;
    };

    Game.prototype.positionToCoordinates = function(i) {
      var x = i % this.size,
          y = (i - x) / this.size;

      return {x: x, y: y };
    };

    Game.prototype.coordinatesToPosition = function(pos) {
      return (pos.y * this.size) + pos.x;
    };

    Game.prototype.inGrid = function(pos) {
      return pos.x >= 0 && pos.x < this.size && pos.y >= 0 && pos.y < this.size;
    };

    Game.prototype.availablePositions = function() {
      var positions = [];
      for (var x = 0; x < this.size; x++) {
        for (var y = 0; y < this.size; y++) {
          var tile = this.getCellAt({ x: x, y: y });
          if (tile === null || tile === undefined) {
            positions.push({ x: x, y: y });
          }
        }
      }

      return positions;
    };

    Game.prototype.randomEmptyPosition = function() {
      var positions = this.availablePositions();
      return positions[Math.floor(Math.random() * positions.length)];
    };

    Game.prototype.randomValue = function() {
      var values = [2, 4];
      return values[Math.floor(Math.random() * values.length)];
    };

    Game.prototype.generateRandomTile = function() {
      var newPosition = this.randomEmptyPosition();
      this.setCellAt(newPosition, new Tile(newPosition, this.randomValue()));
    };

    return Game;

  }]);