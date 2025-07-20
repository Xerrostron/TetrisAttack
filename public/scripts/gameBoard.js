import { Square } from './square.js';
const RED = 1, BLUE = 2, YELLOW = 3, GREEN = 4, PURPLE = 5;
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d')
class GameBoard {
  constructor() {
    this.rows = 24;
    this.cols = 6;
    this.board = []; // Initialize class property
    this.initializeSquareArray();
  }

  initializeSquareArray() {
    for (let i = 0; i < this.rows; ++i) {
      this.board[i] = [];
      for (let j = 0; j < this.cols; ++j) {
        const square = new Square(i, j, this.randomColor());
        this.board[i][j] = square;
        square.draw(ctx);
      }
    }
  }
  randomColor()
  {
    const ranNumber = Math.floor(Math.random() * 5) + 1;
    switch (ranNumber) 
    {
        case RED:    return "red"; 
        case BLUE:   return "blue"; 
        case YELLOW: return "yellow"; 
        case GREEN:  return "green"; 
        case PURPLE: return "purple";
    }
  }
  getSquare(row, col) {
    return this.board[row][col];
  }

  setSquare(row, col, square) {
    this.board[row][col] = square;
  }
}

export { GameBoard };
