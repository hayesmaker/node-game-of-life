module.exports = Game;

function Game() {
  this.grid = [];
  this.generation = 0;
  this.addRow();
  this.addRow();
  this.addRow();
  this.addRow();
  this.addRow();
  this.addRow();
  this.addRow();
  this.addRow();
  this.addRow();
  this.addRow();
  this.logGrid();
}

//var p = Game.prototype;

Game.grid = null;

Game.prototype.addRow = function() {
  this.grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
};

Game.prototype.spawnCell = function (row, col) {
  this.grid[row][col] = 1;
};

Game.prototype.killCell = function (row, col) {
  this.grid[row][col] = 0;
};

Game.prototype.detectNumNeighbours = function(row, col) {
  var numNeighbours = 0;
  numNeighbours += this.grid[row-1][col];
  numNeighbours += this.grid[row+1][col];
  numNeighbours += this.grid[row][col-1];
  numNeighbours += this.grid[row][col+1];
  return numNeighbours;
};


Game.prototype.gameLoop = function() {
  this.generation++;
  //rule 1

  //rule 2

  //rule 3

  //rule 4

};

Game.prototype.logGrid = function() {
  var i;
  var grid = this.grid;
  for (i = 0; i<grid.length; i++) {
    console.log(i, grid[i]);
  }
};