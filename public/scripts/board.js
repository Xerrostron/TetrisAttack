const RED = 1, BLUE = 2, YELLOW = 3, GREEN = 4, PURPLE = 5;
class board{
    constructor()
    {

    }
}
/*Naive approach! Using CSS with graphics is only possible by enumerating every square
to make it act according to actual array time constraints!*/
export var board = Array.from({ length: 24 }, () => Array(6).fill(0)); //most of the board will be invisible to player, but pre-generate rows
export function initializeBoard(board)
{
    for(let i = 0; i<24; ++i)
    {
        for(let j = 0; j<6; ++j)
        {
            board[i][j] = 0;
        }
    }
}
export function prePopulate(board)
{
   for(let i = 0; i< 24; ++i)
   {
        for(let j = 0; j<6; ++j)
        {
              var ranNumber = Math.floor(Math.random() * 5) + 1;
              console.log("Random:", ranNumber);
              board[i][j] = ranNumber;
        }
   }
}
export function printBoard(board)
{
    console.log("Print Board");
    for(let i = 0; i<24;++i)
    {
        console.log(board[i].join(" "));
    }
}
export function translateBoard(board)
{
    const newContainer = document.createElement("div");
    newContainer.setAttribute("class", "playBox");
    document.body.appendChild(newContainer);

    for(let i = 0; i< 24; ++i)
    {
        for(let j = 0; j < 6; ++j)
        {
            const square = document.createElement("div");
            square.classList.add("square");
            switch (board[i][j]) {
             case RED:    square.classList.add("red"); break;
             case BLUE:   square.classList.add("blue"); break;
             case YELLOW: square.classList.add("yellow"); break;
             case GREEN:  square.classList.add("green"); break;
             case PURPLE: square.classList.add("purple"); break;
            }
            newContainer.appendChild(square);
        }
    }
    
}
//write a function to turn a board into a visualized format

