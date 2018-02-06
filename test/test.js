var chai = require('chai');
var Game = require('../src/game');
var expect = chai.expect;


describe('Game Of Life', function () {
  var game;

  beforeEach(function () {
    game = new Game();
  });

  afterEach(function () {
    game = null;
  });

  it('should create 10 rows', function () {
    expect(game.grid.length).to.equal(10);
  });

  it('should create 10 columns', function () {
    var i;
    expect(game.grid.length).to.be.above(0);
    for (i = 0; i < game.grid.length; i++) {
      expect(game.grid[i].length).to.equal(10);
    }
  });

  it('should be able to spawn a cell by row + col', function () {
    expect(game.grid[0][0]).to.equal(0);
    game.spawnCell(0, 0);
    expect(game.grid[0][0]).to.equal(1);

    expect(game.grid[2][5]).to.equal(0);
    game.spawnCell(2, 5);
    expect(game.grid[2][5]).to.equal(1);
  });

  it('should be able to kill a cell by row + col', function () {
    game.spawnCell(0, 0);
    game.killCell(0, 0);
    expect(game.grid[0][0]).to.equal(0);

    game.spawnCell(2, 5);
    game.killCell(2, 5);
    expect(game.grid[2][5]).to.equal(0);
  });

  describe('Counting neighbours', function () {
    it('given 1 seed at 2,5, should count 0 live neighbours', function () {
      game.spawnCell(2, 5);

      var numNeighbours = game.detectNumNeighbours(2, 5);
      expect(numNeighbours).to.equal(0);
    });

    it('given 2 cells spawn next to seed, should count 2 live neighbours', function () {
      game.spawnCell(2, 5);

      game.spawnCell(1, 5);
      game.spawnCell(3, 5);

      var numNeighbours = game.detectNumNeighbours(2, 5);
      expect(numNeighbours).to.equal(2);
    });

    it('given 1 seed at 3,5, and 2 neighbours, should count 2 live neighbours', function () {
      game.spawnCell(2, 5);
      game.spawnCell(3, 5);
      game.spawnCell(4, 5);
      var numNeighbours = game.detectNumNeighbours(3, 5);
      expect(numNeighbours).to.equal(2);
    });

    it('given 1 seed at 3,5, and 4 diagonal neighbours, should count 4 live neighbours', function () {
      game.spawnCell(2, 4);
      game.spawnCell(3, 5);
      game.spawnCell(2, 6);
      game.spawnCell(4, 4);
      game.spawnCell(4, 6);
      var numNeighbours = game.detectNumNeighbours(3, 5);
      expect(numNeighbours).to.equal(4);
    });

    it('given 1 seed at the edge of the game grid, shouldn\'t error', function () {
      game.spawnCell(0, 0);
      var numNeighbours = game.detectNumNeighbours(0, 0);
      expect(numNeighbours).to.equal(0);

    });
  });


  describe('Rule 1: Any live cell with fewer than two live neighbours dies, as if caused by underpopulation', function () {

    it('given only 1 seed at 3,5, the cell should die', function () {
      game.spawnCell(3, 5);
      var cellState = game.checkRules(3, 5);
      expect(cellState).to.equal(0);
    });

  });


  describe('Rule 2: Any live cell with two or three live neighbours lives on to the next generation.', function () {

    it('given 1 seed at 3,5 and 2 neighbours the cell should live', function () {
      game.spawnCell(2, 5);
      game.spawnCell(3, 5);
      game.spawnCell(4, 5);
      var cellState = game.checkRules(3, 5);
      expect(cellState).to.equal(1);
    });

    it('given 1 seed at 3,5 and 3 neighbours the cell should live', function () {
      game.spawnCell(2, 5);
      game.spawnCell(3, 5);
      game.spawnCell(3, 4);
      game.spawnCell(3, 6);
      var cellState = game.checkRules(3, 5);
      expect(cellState).to.equal(1);
    });

  });

  describe('Rule 3: Any live cell with more than three live neighbours dies, as if by overpopulation.', function () {

    it('given 1 seed at 3,5 and 4 neighbours the cell should die', function () {
      game.spawnCell(3, 5);
      game.spawnCell(2, 5);
      game.spawnCell(4, 5);
      game.spawnCell(3, 6);
      game.spawnCell(3, 4);
      var cellState = game.checkRules(3, 5);
      expect(cellState).to.equal(0);
    });


  });


  describe('Rule 4: Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.', function () {

    it('given a dead cell at 3,5 and 3 neighbours the cell should spawn', function () {
      game.spawnCell(2, 5);
      game.spawnCell(4, 5);
      game.spawnCell(3, 6);
      var cellState = game.checkRules(3, 5);
      expect(cellState).to.equal(1);
    });

  });

  describe('GameLoop', function () {
    it('render am empty game without error', function () {
      game.gameLoop();
    });

    it('render a generation with seeds without error', function () {
      game.spawnCell(3, 5);
      game.spawnCell(2, 5);
      game.spawnCell(4, 5);
      game.gameLoop();
    });

    it('render 10 generations with seeds without error', function () {
      game.spawnCell(3, 5);
      game.spawnCell(2, 5);
      game.spawnCell(4, 5);
      game.gameLoop();
      game.gameLoop();
      game.gameLoop();
      game.gameLoop();
      game.gameLoop();
      game.gameLoop();
      game.gameLoop();
      game.gameLoop();
      game.gameLoop();
      game.gameLoop();
      expect(game.generation).to.equal(10);
    });
  });


});

