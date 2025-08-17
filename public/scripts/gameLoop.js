import{GameBoard} from './gameBoard.js';
import {PlayerCursor} from './cursor.js';
//initialize game board
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const board = new GameBoard(ctx);

const cursorContext = document.getElementById("cursorCanvas");
const cursorCtx = cursorContext.getContext("2d");
const cursor = new PlayerCursor(0,1,cursorCtx);
cursor.drawCursor();
function dropToIndex(start,end, column, ctx, board, cursor)
{
    const difference = start - end;
    let newStack = [];
    for(let i = start; i<24; ++i)
    {//start and end indices are inclusive. start has a real color, end has white
        console.log("Start: " + start + " End: " + end);
        console.log("Difference: " + difference);
        let prevColor = board[i][column].color;
        board[i][column].color = "white";
        board[i][column].draw(ctx);
        console.log("i - difference: " + (i-difference));
        //new index has the old color of the prev color
        console.log("Old index with color: " + i + " " + column + " " + prevColor + " to white");
        console.log("New index with color: " + (i-difference) + " " + column + " " + " to: "+ prevColor);
        board[i-difference][column].color = prevColor;
        board[i-difference][column].draw(ctx);

        
        //cursor.checkVertical((i-difference), column,board[i-difference][column], board, ctx, );
        //cursor.checkHorizontal((i-difference), column,board[i-difference][column], board, ctx, );

    }
    console.log("Drop to index completed");
    //once everything has fallen into place, go ahead and do vertical/horizontal checks

}
async function applyGravity(ctx, gameBoard, cursor) {
    try {
        const board = gameBoard.board;
        const numRows = board.length;
        const numCols = board[0].length;
        
        for (let i = 0; i < numCols; ++i) {
            console.log("looking for white counts: column", i);

            let stack = [];
            let whiteCount = 0;
            let column = i;

            for (let j = 23; j >= 0; --j) {
                console.log("Row: " + j);
                console.log("color: " + board[j][i].color);
                if (board[j][i].color != "white") {
                    if (whiteCount != 0) {
                        let start = stack.pop();
                        let end = Math.abs(start - whiteCount);
                        whiteCount = 0;
                        stack = [];
                        console.log("Drop to index called");
                        dropToIndex(start, end, column, ctx, board, cursor);
                    }
                    console.log("pushing to stack");
                    stack.push(j);
                }

                if (board[j][i].color === "white") {
                    if (stack.length != 0) {
                        whiteCount++;
                        if (j === 0) {
                            let start = stack.pop();
                            let end = Math.abs(start - whiteCount);
                            console.log("Drop to index called");
                            dropToIndex(start, end, column, ctx, board, cursor);
                            whiteCount = 0;
                            stack = [];
                        }
                    }
                }
            }

            if (whiteCount === 0) {
                stack = [];
            }
        }
    } catch (err) {
        console.error("applyGravity error:", err);
    }
}

function inputHandler(cursor, board, ctx) {
    document.addEventListener('keydown', async (e) => { // ✅ async here
        switch (e.key.toLowerCase()) {
            case 'w':
                cursor.moveUp();
                break;
            case 's':
                cursor.moveDown();
                break;
            case 'a':
                cursor.moveLeft();
                break;
            case 'd':
                cursor.moveRight();
                break;
            case 'enter':
                await cursor.swapPositions(board.board, ctx); // ✅ await now valid
                applyGravity(ctx, board, cursor);       // optionally await this too
                break;
        }

        // Redraw cursor after movement
        cursor.drawCursor();
    });
}



inputHandler(cursor,board, ctx);

// Call the function to create the button

//cursor.swapPositions(board.board, ctx);





