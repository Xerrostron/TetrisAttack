import{GameBoard} from './gameBoard.js';

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Initialize and draw the game board
const board = new GameBoard(ctx);
function drawCursor(ctx, row, col) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 3;
  ctx.strokeRect(col * 50, (23 - row) * 50, 50, 50);         // first square
  ctx.strokeRect((col + 1) * 50, (23 - row) * 50, 50, 50);   // adjacent square
}
function swapPositions(board, ctx) {
  // Create the button element
  const swapButton = document.createElement("button");
  swapButton.textContent = "Swap";
  
  // Add it to the page (e.g., inside body or a container)
  document.body.appendChild(swapButton);
  
  // Add a click event listener
  swapButton.addEventListener("click", () => {
    // Your swap logic here, e.g. swapping two squares on the board
    console.log("Swap button clicked!");
    // Example: swap board[0][0] and board[0][1] colors (you'll adapt to your actual board)

    const sq1 = board[0][0];
    const sq2 = board[0][1];
    const tempColor = sq1.color;
    sq1.color = sq2.color;
    sq2.color = tempColor;
    console.log(board[0][0]);
    // Redraw them if needed
    sq1.draw(ctx);
    sq2.draw(ctx);
  });
}

// Call the function to create the button
const cursorContext = document.getElementById("cursorCanvas");
const cursorCtx = cursorContext.getContext("2d");
swapPositions(board.board, ctx);
drawCursor(cursorCtx, 0, 0);




