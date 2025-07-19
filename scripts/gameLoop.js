import{board, initializeBoard, printBoard, prePopulate} from './board.js'
let gameLoop = document.querySelector(".gameLoop");//let for const, var for reassignment
let playBox = document.querySelector(".playBox");
const RED = 1, BLUE = 2, YELLOW = 3, GREEN = 4, PURPLE = 5;
var count = 0;
function addRandomSquare() {
  const square = document.createElement("div");
  square.classList.add("square");

  const ranNumber = Math.floor(Math.random() * 5) + 1;
  console.log("Random:", ranNumber);

  switch (ranNumber) {
    case RED:    square.classList.add("red"); break;
    case BLUE:   square.classList.add("blue"); break;
    case YELLOW: square.classList.add("yellow"); break;
    case GREEN:  square.classList.add("green"); break;
    case PURPLE: square.classList.add("purple"); break;
  }
  playBox.appendChild(square);
}
const interval = setInterval(() => {
  if (count === 10) return clearInterval(interval);
  addRandomSquare();
  count++;
}, 2000);

initializeBoard();
prePopulate(board);
printBoard();
