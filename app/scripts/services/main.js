'use strict';

angular.module('2048GridApp.services', [])

  .service('Game', ['Tile', function(Tile) {

    this.tiles = [];
    this.size  = 4;
    this.model = [];

    // var vectors = {
    //   'left': { x: -1, y: 0 },
    //   'right': { x: 1, y: 0 },
    //   'up': { x: 0, y: -1 },
    //   'down': { x: 0, y: 1 }
    // };

    this.addTile = function(tile) {
      this.tiles.push(tile);
    };

    this.initializeModel = function() {
      for(var i = 0; i < this.size; i++) {
        this.model[i] = [];
        for(var j = 0; j < this.size; j++) {
          this.model[i][j] = -1;
        }
      }
    };

    this.updateModel = function() {
      var _this = this;

      this.tiles.forEach(function(tile) {
        _this.model[tile.y][tile.x] = tile.value;
      });
    };

    this.updateTiles = function() {
      this.tiles = [];
      for(var i = 0; i < this.model.length; i++) {
        for(var j = 0; j < this.model.length; j++) {
          if (this.model[i][j] > -1) {
            this.tiles.push(new Tile({x: i, y: j}, this.model[i][j]));
          }
        }
      }
    };

    this.removeEmpty = function(array) {
      var newArray = [];

      for (var i = 0; i < array.length; i++) {
        if (array[i] > -1) {
          newArray.push(array[i]);
        }
      }

      return newArray;
    };

    this.twoNumberNeighbor = function(row) {
      var test = false;

      for (var i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
          test = true;
        }
      }

      return test;
    };

    this.pushLeft = function(subModel) {
      for (var i = 0; i < subModel.size - 1; i++) {
        if (subModel[i] === subModel[i + 1]) {
          subModel[i] = subModel[i] * 2;
          subModel.splice(i + 1, 1);
        }
      }

      return subModel;
    };

    this.pushRight = function(array) {
      return this.pushLeft(array.reverse());
    };

    this.extractColumn = function(index) {
      var column = [];
      for (var k = 0; k < this.model.length; k++) {
        column.push(this.model[k][index]);
      }

      return column;
    };

    this.replaceColumn = function(index, array) {
      for (var k = 0; k < array.length; k++) {
        this.model[k][index] = array[k];
      }
    };

    this.moveLeft = function() {
      for (var i = 0; i < this.model.length; i++) {
        // Remove empty cells
        console.log(this.model[i]);
        var newRow = this.removeEmpty(this.model[i]);

        console.log(this.twoNumberNeighbor(newRow));
        console.log('enter');
        // merge the cells that have the same number
        while(this.twoNumberNeighbor(newRow) === true) {
          newRow = this.pushLeft(newRow);
        }

        // add empty cell
        while (newRow.length < 4) {
          newRow.push(-1);
        }

        this.model[i] = newRow;
      }
    };

    this.moveRight = function() {
      for (var i = 0; i < this.model.length; i++) {
        // Remove empty cells
        var newRow = this.removeEmpty(this.model[i]);

        // merge the cells that have the same number
        while(this.twoNumberNeighbor(newRow) === true) {
          newRow = this.pushRight(newRow);
        }

        // add empty cell
        while (newRow.length < 4) {
          newRow.unshift(-1);
        }

        this.model[i] = newRow;
      }
    };

    this.moveUp = function() {
      for (var i = 0; i < this.model.length; i++) {
        // Remove empty cells
        var newColumn = this.removeEmpty(this.extractColumn(this.model, i));

        // merge the cells that have the same number
        while(this.twoNumberNeighbor(newColumn)) {
          newColumn = this.pushLeft(newColumn);
        }

        // add empty cell
        while (newColumn.length < 4) {
          newColumn.push(-1);
        }

        this.replaceColumn(i, newColumn);
      }
    };

    this.moveDown = function() {
      for (var i = 0; i < this.model.length; i++) {
        // Remove empty cells
        var newColumn = this.removeEmpty(this.extractColumn(this.model, i));

        // merge the cells that have the same number
        while(this.twoNumberNeighbor(newColumn)) {
          newColumn = this.pushRight(newColumn);
        }

        // add empty cell
        while (newColumn.length < 4) {
          newColumn.unshift(-1);
        }

        this.replaceColumn(i, newColumn);
      }
    };

  }])

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
