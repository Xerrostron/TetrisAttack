 //const beep = new Audio('sounds/beep.mp3');
 class PlayerCursor{
    constructor(row,col, ctx)
    {
        this.row = row;
        this.col = col;
        this.ctx = ctx;
    }
    
    drawCursor() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(this.col * 50, (23 - this.row) * 50, 50, 50);         // first square
    this.ctx.strokeRect((this.col + 1) * 50, (23 - this.row) * 50, 50, 50);   // adjacent square
    }
    moveUp()    { this.row = Math.min(this.row + 1, 23); }
    moveDown()  { this.row = Math.max(this.row - 1, 0); }
    moveLeft()  { this.col = Math.max(this.col - 1, 0); }
    moveRight() { this.col = Math.min(this.col + 1, 6 - 2); } // -2 if 2-s
   async swapPositions(board, ctx) {//take in the board context
  
     //const sq1 = board.board.getSquare(this.row,this.col);
    // const sq2 = board.board.getSquare(this.row,this.col+1);
     console.log(this.row, "THIS ROW");
     const row = this.row;
     const col = this.col; //grab the row and col to prevent race conditions
     const sq1 = board[row][col];
     const sq2 = board[row][col+1];
     //const sq2 = board.getSquare(this.row, this.col+1);
     const tempColor = sq1.color;
     let topIndex = null;
     let bottomIndex = null;
     let leftIndex = null;
     let rightIndex = null;
     sq1.color = sq2.color;
     sq2.color = tempColor;

     let breakTasks = [];

     if (sq1.color !== "white")
    {
          const horizontalResult = await this.checkHorizontal(row, col, sq1, board, ctx);
          if (horizontalResult !== null) 
          {
           const { leftIndex, rightIndex } = horizontalResult;
           breakTasks.push(this.breakColumns(leftIndex, rightIndex, board, row, ctx));
          }

         const verticalResult = await this.checkVertical(row, col, sq1, board, ctx);
         if (verticalResult !== null) 
         {
          const { topIndex, bottomIndex } = verticalResult;
          breakTasks.push(this.breakRows(topIndex, bottomIndex, board, col, ctx));
         }
    }

    if (sq2.color !== "white") 
    {
     const horizontalResult = await this.checkHorizontal(row, col + 1, sq2, board, ctx);
     if (horizontalResult !== null) 
     {
      const { leftIndex, rightIndex } = horizontalResult;
      breakTasks.push(this.breakColumns(leftIndex, rightIndex, board, row, ctx));
     }

     const verticalResult = await this.checkVertical(row, col + 1, sq2, board, ctx);
    if (verticalResult !== null) 
    {
       const { topIndex, bottomIndex } = verticalResult;
       breakTasks.push(this.breakRows(topIndex, bottomIndex, board, col + 1, ctx));
    }
   }

// ✅ Wait for all breaks to happen "in parallel"
    await Promise.all(breakTasks);

      //if (sq1.color !== "white") {
     // await this.checkVertical(row, col, sq1, board, ctx);
     // }
    // if (sq2.color !== "white") {
     //  await this.checkVertical(row, col + 1, sq2, board, ctx);
    //  }
     console.log(board[0][0]);
    // Redraw them if needed
     sq1.draw(ctx);
     sq2.draw(ctx);
     }
     localValidateMove(board, ctx, row, col)
     {
        //get the range endpoints of the swapped cursors (2 blocks)
        //if range >=3, match
        //this 
         const sq1 = board[row][col];
         const sq2 = board[row][col+1];

         //DIRECTLY After swapposition: these 2 squares have new colors
     }
     async breakRows(topIndex,bottomIndex,board,col,ctx)
     {
        for(let i = bottomIndex; i<=topIndex; ++i)
        {
           const square = board[i][col];
           square.startBreak();
           await this.animateBreak(square, ctx);
           this.playBreakSound();

            square.color = "white";
            square.draw(ctx);
           // board[i][col].color ="white";
           // board[i][col].draw(ctx);
            
        }
     }
    
    async breakColumns(leftIndex,rightIndex,board, row,ctx)
     {
        for(let i = leftIndex; i<= rightIndex; ++i)
        {
           // board[row][i].color = "white";
           // board[row][i].draw(ctx);
           
            const square = board[row][i];
            square.startBreak();
            await this.animateBreak(square, ctx);
            this.playBreakSound();
            square.color = "white";
            square.draw(ctx);
        }
     }
    animateBreak(square, ctx) {
    return new Promise((resolve) => {
      function animate() {
       square.update(); // assumes this alters `opacity`
       square.draw(ctx);

       if (square.opacity > 0) {

            requestAnimationFrame(animate);
       } else {
         console.log("done animating");
         resolve(); // done animating
        }
      }
      animate();
     });
    }
     playBreakSound() {
         const beep = new Audio('sounds/pickupCoin.wav');
         beep.volume = 0.4;
         beep.currentTime = 0;
         beep.play();
    }
     async checkVertical(row,col,sq,board,ctx)
     {
        let count = 1;
        let topIndex = row;
        let bottomIndex = row;
        while(topIndex < 23)
        {
            if(board[topIndex][col].color === board[topIndex+1][col].color)
            {
                ++count;
                topIndex++;
            }
            else{
                break;
            }
        }
        while(bottomIndex > 0)
        {
            if(board[bottomIndex][col].color === board[bottomIndex-1][col].color)
            {
                ++count;
                --bottomIndex;
            }
            else{
                break;
            }

        }
        if(count >=3)
        {
            console.log("Vertical check passed!");
            return {topIndex, bottomIndex};
            //await this.breakRows(topIndex,bottomIndex,board,col,ctx);
        }
        console.log("topIndex: " + topIndex + "  Bottom index: " + bottomIndex);
        return null;
        //return {topIndex, bottomIndex};
     }
     async checkHorizontal(row,col,sq, board,ctx)
     {
        let leftCount = 1;
        let rightCount = 1;
        let leftIndex = col;
        let rightIndex = col;
        //need to check both left and right so you can match >3 across entire row
        //for one color! this DOESNT mismatch colors

        while(leftIndex > 0)
        {
            if(sq.color === board[row][leftIndex-1].color)
            {
                ++leftCount;
                --leftIndex; // want an inclusive range, so breakLine with curCol + 1
            }
            else{
                break;
            }
        }
        while(rightIndex <= 5)
        {
            if(rightIndex ==5)
            {
                break;
            }
            if(sq.color === board[row][rightIndex+1].color)
            {
                ++rightCount;
                ++rightIndex;
            }
            else{
                break;
            }
        }
        console.log("Right Index: " + rightIndex);
        console.log("Left Index: " + leftIndex);
        //4 indices: 2 for rightCount, 2 for leftCount
        //are these 2 if statements redundant for an entire row break since
        //indices are shared?
        //if(rightCount >= 3)
        //{
        //    console.log("This would be a right break.");
         //   await this.breakColumns(leftIndex,rightIndex, board,row,ctx);
            //break with given Indices
       // }
        //if(leftCount >= 3)
        //{
        //    console.log("This would be a left break.");
        //    await this.breakColumns(leftIndex, rightIndex, board,row,ctx);
       // }
       if(leftCount >= 3 || rightCount >= 3)
       {
            console.log("This would be a horizontal break.");
            return {leftIndex, rightIndex};
            //await this.breakColumns(leftIndex, rightIndex, board,row,ctx);
       }
       return null;
      // return {leftIndex, rightIndex};
     }
 }
//right break logic is broken!
export {PlayerCursor};

