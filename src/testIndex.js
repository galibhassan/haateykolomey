const Brush = require('./classes/brush').Brush
const Board = require('./classes/board').Board

const canvas = document.getElementById("canvas");

const myBoard = new Board(canvas, 100, 200);
const myBrush = new Brush(2, "red", "kolom", myBoard.getCanvas());

myBoard.enableEventListeners()

const mainDrawingLoop = () => {
    if (myBoard.isDrawingPossible) {
        myBrush.drawCircle(myBoard.drawingInfo.currentX, myBoard.drawingInfo.currentY)
    }
    requestAnimationFrame(mainDrawingLoop)

   
}
mainDrawingLoop()