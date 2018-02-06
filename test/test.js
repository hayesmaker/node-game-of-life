var chai = require('chai');
var Game = require('../src/game');
var expect = chai.expect;


describe('Game Of Life', function() {
  var game;

  before(function(){
    game = new Game();
  });

  after(function() {
    game = null;
  });

  it('should create 10 rows', function() {
    expect(game.grid.length).to.equal(10);
  });

  it('should create 10 columns', function() {
    var i;
    for (i = 0; i<game.grid.length; i++) {
        expect(game.grid[i].length).to.equal(10);
    }
  });

  it('should be able to spawn a cell by row + col', function() {
    expect(game.grid[0][0]).to.equal(0);
    game.spawnCell(0,0);
    expect(game.grid[0][0]).to.equal(1);

    expect(game.grid[2][5]).to.equal(0);
    game.spawnCell(2, 5);
    expect(game.grid[2][5]).to.equal(1);
  });

  it('should be able to kill a cell by row + col', function() {
    game.spawnCell(0,0);
    game.killCell(0,0);
    expect(game.grid[0][0]).to.equal(0);

    game.spawnCell(2, 5);
    game.killCell(2, 5);
    expect(game.grid[2][5]).to.equal(0);
  });

  it('given 1 seed at 2,5, should count 0 live neighbours', function() {
    game.spawnCell(2,5);

    var numNeighbours = game.detectNumNeighbours(2, 5);
    expect(numNeighbours).to.equal(0);
  });

  it('given 2 cells spawn next to seed, should count 2 live neighbours', function() {
    game.spawnCell(2,5);

    game.spawnCell(1, 5);
    game.spawnCell(3, 5);

    var numNeighbours = game.detectNumNeighbours(2, 5);
    expect(numNeighbours).to.equal(2);
  });


  describe('Rule 1: Any live cell with fewer than two live neighbours dies, as if caused by underpopulation', function() {

    it('given only 1 seed at 3,5, the cell should die', function() {

      game.spawnCell(3,5);
      game.gameLoop();
      expect(game.grid[3][5]).to.equal(0);
    });


  });



});