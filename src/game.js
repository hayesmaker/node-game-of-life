module.exports = Game;

/**
 * A new game creates a new `grid` (the main grid which gets rendered and used as the model for the next gen)
 * A new game creates a `newGrid` (copied to the main grid for rendering before cleared)
 * A new game starts at Generation 0
 *
 * @class Game
 * @constructor
 */
function Game() {
  this.grid = this.eraseGrid();
  this.newGrid = this.eraseGrid();
  this.generation = 0;
}

var p = Game.prototype;

p.grid = null;
p.newGrid = null;

/**
 * @method eraseGrid
 * @returns {*[]}
 */
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

/**
 * @method spawnCell
 * @param row
 * @param col
 */
p.spawnCell = function (row, col) {
  this.grid[row][col] = 1;
};

/**
 * @method killCell
 * @param row
 * @param col
 */
p.killCell = function (row, col) {
  this.grid[row][col] = 0;
};

/**
 * retuns the number of neighbours given a cell position (row, col)
 * including diagonal cells, and accounting for cells at the edge of the game
 * provides some complexity here
 *
 * @method detectNumNeighbours
 * @param row
 * @param col
 * @returns {number}
 */
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

/**
 * Checks a cell located at row,col
 * against Conway's Game of Life rules
 * based on: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 *
 * @method checkRules
 * @param row
 * @param col
 * @returns {number}
 */
p.checkRules = function (row, col) {
  if (this.detectNumNeighbours(row, col) < 2) {          //1 death from under population
    return 0;
  } else if (this.detectNumNeighbours(row, col) > 3) {   //3: death over population
    return 0;
  } else {
    return 1;                                            //2 & 4: stay alive or spawned through reproduction
  }
};

/**
 * Render's the grid
 *
 * @method render
 */
p.render = function () {
  var i;
  var grid = this.grid;
  console.log('--------------------------');
  for (i = 0; i < grid.length; i++) {
    console.log(i, grid[i]);
  }
  console.log('--------------------------');
};