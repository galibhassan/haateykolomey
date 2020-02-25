
    const Brush = require('./classes/brush').Brush
    const Board = require('./classes/board').Board
    
    const canvas = document.getElementById("canvas");
    
    const myBoard = new Board(canvas, 100, 200);
    console.log("board created hoilo")
    const myBrush = new Brush(2, "red", "kolom", myBoard.getCanvas());
    
    const colorUserChosen = document.getElementById('colorUserChosen')
    colorUserChosen.addEventListener('change', ()=>{
        
        myBrush.setBrushColor(colorUserChosen.value)
    })
    
    myBoard.enableEventListeners()
    const mainDrawingLoop = () => {
        if (myBoard.isDrawingPossible) {
            myBrush.drawCircle(myBoard.drawingInfo.currentX, myBoard.drawingInfo.currentY)
        }
        requestAnimationFrame(mainDrawingLoop)
        
        
    }
    mainDrawingLoop()