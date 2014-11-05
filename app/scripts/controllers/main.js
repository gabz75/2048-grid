'use strict';

angular.module('2048GridApp')
  .controller('MainCtrl', function ($scope, $document) {

    var initGame = function() {
      var data = [];

      for (var i = 0; i < 4; i++) {
        data[i] = [];
        for (var j = 0; j < 4; j++) {
          data[i][j] = -1;
        }
      }

      return data;
    };

    var removeEmpty = function(array) {
      var newArray = [];
      for (var i = 0; i < array.length; i++) {
        if (array[i] > -1) {
          newArray.push(array[i]);
        }
      }

      return newArray;
    };

    var twoNumberNeighbor = function(array) {
      var test = false;

      for (var i = 0; i < array.length - 1; i++) {
        if (array[i] === array[i + 1]) {
          test = true;
        }
      }

      return test;
    };

    var pushLeft = function(array) {
      for (var i = 0; i < array.length - 1; i++) {
        if (array[i] === array[i + 1]) {
          array[i] = array[i] * 2;
          array.splice(i + 1, 1);
        }
      }

      return array;
    };

    var pushRight = function(array) {
      return pushLeft(array.reverse());
    };

    var extractColumn = function(grid, index) {
      var newArray = [];
      for (var k = 0; k < grid.length; k++) {
        newArray.push(grid[k][index]);
      }

      return newArray;
    };

    var replaceColumn = function(grid, index, array) {
      for (var k = 0; k < array.length; k++) {
        grid[k][index] = array[k];
      }

      return grid;
    };

    var moveLeft = function(data) {

      for (var i = 0; i < data.length; i++) {
        // Remove empty cells
        var newRow = removeEmpty(data[i]);

        // merge the cells that have the same number
        while(twoNumberNeighbor(newRow)) {
          newRow = pushLeft(newRow);
        }

        // add empty cell
        while (newRow.length < 4) {
          newRow.push(-1);
        }

        data[i] = newRow;
      }

      return data;
    };

    var moveRight = function(data) {
      for (var i = 0; i < data.length; i++) {
        // Remove empty cells
        var newRow = removeEmpty(data[i]);

        // merge the cells that have the same number
        while(twoNumberNeighbor(newRow)) {
          newRow = pushRight(newRow);
        }

        // add empty cell
        while (newRow.length < 4) {
          newRow.unshift(-1);
        }

        data[i] = newRow;
      }

      return data;
    };

    var moveUp = function(data) {
      for (var i = 0; i < data.length; i++) {
        // Remove empty cells
        var newColumn = removeEmpty(extractColumn(data, i));

        // merge the cells that have the same number
        while(twoNumberNeighbor(newColumn)) {
          newColumn = pushLeft(newColumn);
        }

        // add empty cell
        while (newColumn.length < 4) {
          newColumn.push(-1);
        }

        data = replaceColumn(data, i, newColumn);
      }
      return data;
    };

    var moveDown = function(data) {
      for (var i = 0; i < data.length; i++) {
        // Remove empty cells
        var newColumn = removeEmpty(extractColumn(data, i));

        // merge the cells that have the same number
        while(twoNumberNeighbor(newColumn)) {
          newColumn = pushRight(newColumn);
        }

        // add empty cell
        while (newColumn.length < 4) {
          newColumn.unshift(-1);
        }

        data = replaceColumn(data, i, newColumn);
      }
      return data;
    };

    var newTile = function(data) {
      var freeIndexes = [];

      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data.length; j++) {
          if (data[i][j] === -1) {
            freeIndexes.push([i, j]);
          }
        }
      }

      if (freeIndexes.length === 0) {
        return false;
      }

      var newIndex = sample(freeIndexes);
      var newValue = sample([2, 4]);

      data[newIndex[0]][newIndex[1]] = newValue;

      return data;
    };

    var sample = function(array) {
      return array[Math.floor(Math.random() * array.length)];
    };

    $document.bind('keypress', function(event) {
      switch(event.keyCode) {
        case 37:
          $scope.game = moveLeft($scope.game);
          $scope.game = newTile($scope.game);
          $scope.$apply();
          break;
        case 38:
          $scope.game = moveUp($scope.game);
          $scope.game = newTile($scope.game);
          $scope.$apply();
          break;
        case 39:
          $scope.game = moveRight($scope.game);
          $scope.game = newTile($scope.game);
          $scope.$apply();
          break;
        case 40:
          $scope.game = moveDown($scope.game);
          $scope.game = newTile($scope.game);
          $scope.$apply();
          break;
      }

      if ($scope.game === false) {
        console.log('Game Over');
      }

    });

    $scope.game = initGame();
    $scope.game = newTile($scope.game);
    $scope.game = newTile($scope.game);

  });
