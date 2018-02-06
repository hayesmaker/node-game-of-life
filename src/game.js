module.exports = Game;

function Game() {
  this.grid = this.eraseGrid();
  this.newGrid = this.eraseGrid();
  this.generation = 0;
}

var p = Game.prototype;

p.grid = null;

p.eraseGrid = function () {
  return [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
};

p.spawnCell = function (row, col) {
  this.grid[row][col] = 1;
};

p.killCell = function (row, col) {
  this.grid[row][col] = 0;
};

p.detectNumNeighbours = function (row, col) {
  var numNeighbours = 0;
  //top left diagonal
  if (this.grid[row -1] && this.grid[row -1][col - 1]) {
    numNeighbours += this.grid[row - 1][col - 1];
  }
  //top right diagonal
  if (this.grid[row -1] && this.grid[row -1][col + 1]) {
    numNeighbours += this.grid[row - 1][col + 1];
  }
  //bottom left diagonal
  if (this.grid[row + 1] && this.grid[row +1][col - 1]) {
    numNeighbours += this.grid[row + 1][col - 1];
  }
  //bottom right diagonal
  if (this.grid[row + 1] && this.grid[row + 1][col + 1]) {
    numNeighbours += this.grid[row + 1][col + 1];
  }
  numNeighbours += this.grid[row - 1] ? this.grid[row - 1][col] : 0;          //left
  numNeighbours += this.grid[row + 1] ? this.grid[row + 1][col] : 0;          //right
  numNeighbours += this.grid[row][col - 1] ? this.grid[row][col - 1] : 0;     //top
  numNeighbours += this.grid[row][col + 1] ? this.grid[row][col + 1] : 0;     //bottom
  return numNeighbours;
};

/**
 * Main Game Loop Steps forwards 1 generation
 * First this method checks the game of life rules every square of the grid, and updates a new grid based on the result
 * Then the new grid is copied to the main grid model
 * Then the new gris is cleared ready for the next gen.
 *
 * @method gameLoop
 */
p.gameLoop = function () {
  this.generation++;
  var i, j;
  for (i = 0; i < this.grid.length; i++) {
    for (j = 0; j < this.grid[i].length; j++) {
      this.newGrid[i][j] = this.checkRules(i, j);
    }
  }
  this.grid = this.newGrid.slice();
  this.newGrid = this.eraseGrid();
  this.render();
};

p.checkRules = function (row, col) {
  if (this.detectNumNeighbours(row, col) < 2) {          //1 death from under population
    return 0;
  } else if (this.detectNumNeighbours(row, col) > 3) {   //3: death over population
    return 0;
  } else {
    return 1;                                            //2 & 4: stay alive or spawned through reproduction
  }
};

p.render = function () {
  var i;
  var grid = this.grid;
  console.log('--------------------------');
  for (i = 0; i < grid.length; i++) {
    console.log(i, grid[i]);
  }
  console.log('--------------------------');
};