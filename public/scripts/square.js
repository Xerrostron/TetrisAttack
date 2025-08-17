const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d')
export class Square {
   
    //take in the array position and the color
  MAXROWS = 24;
  MAXCOLS = 6;
  constructor(row, col, color) {
    this.row = row;
    this.col = col;
    this.logicalColor = color;
    this.opacity = 1;
    this.isBreaking = false;
  }
  //color is usually in a string format, hexadecimal format, or any valid CSS color format
  startBreak()
  {
    this.isBreaking = true;
  }
    update() {
        if (this.opacity > 0) {
            this.logicalColor = "black";
            this.opacity -= 0.05;
            if (this.opacity < 0) this.opacity = 0;
        }
    }
  draw(ctx) {
    ctx.fillStyle = this.logicalColor;
    //x, y, width, height
    //draw with square.draw(ctx)
    //the width of the gameCanvas is 300, 1200
    //0-300 is inclusive of 0-6 with 50 multiplier
    //0-1200 is inclusive of 0-24 with multiplier of 50
    //to make the cursor, would that be another canvas?
    let totalRows = this.MAXROWS;
    const flippedRow = totalRows - 1 - this.row;//makes it build bottom up, done through
    //y-axis manipulation!
    ctx.fillStyle = this.logicalColor;
    ctx.fillRect(this.col * 50, flippedRow * 50, 50, 50);
  }
  set color(val) {
        this.logicalColor = val;
        this.opacity = 1; // reset opacity when assigning new color
    }
  get color() {
    return this.logicalColor;
}
}