const RED = 1, BLUE = 2, YELLOW = 3, GREEN = 4, PURPLE = 5;
export var board = [24][6]; //most of the board will be invisible to player, but pre-generate rows
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
    for(let i = 0; i<24;++i)
    {
        for(let j = 0; j< 6; ++j)
        {
            console.log(board[i][j]);
        }
    }
}
