const Brush = require('./classes/brush').Brush
const Board = require('./classes/board').Board


const drawingCanvas = document.getElementById("canvas");

// const myBoard = new Board(drawingCanvas, 100, 200);


const myBoard = new Board( drawingCanvas, 100, 200, 'white' );


console.log("board created hoilo")
const myBrush = new Brush(2, "black", "kolom", myBoard.getCanvas());

/*const colorUserChosen = document.getElementById('colorUserChosen')
colorUserChosen.addEventListener('change', () => {

    myBrush.setBrushColor(colorUserChosen.value)
})*/


const boardButtonReal = document.getElementById('boardButtonReal')
const boardButtonFake = document.getElementById('boardButtonFake')
const brushButtonReal = document.getElementById('brushButtonReal')
const brushButtonFake = document.getElementById('brushButtonFake')
//const userChosenBoardColor = document.getElementById('userChosenBoardColor')
var eraseButton = document.getElementById("eraseButton")

brushButtonReal.style.opacity = 0
brushButtonFake.addEventListener('click', (e)=>{
    brushButtonReal.click()
})

brushButtonFake.addEventListener('change', (e)=>{
    brushButtonFake.style.backgroundColor = e.target.value
    //myBrush.setBrushColor(colorUserChosen.value)
    myBrush.setBrushColor(e.target.value)

})

boardButtonReal.style.opacity = 0
boardButtonFake.addEventListener('click', (e)=>{
    boardButtonReal.click()
})

boardButtonFake.addEventListener('change', (e)=>{
    boardButtonFake.style.backgroundColor = e.target.value
    //myBoard.setBoardColor(userChosenBoardColor.value)
    myBoard.setBoardColor(e.target.value)

})

var eraseButton = document.getElementById("eraseButton")
eraseButton.addEventListener("click", () => {

    //color.style.display = "block";

    const myCanvas = document.getElementById("canvas")
    const ctx = myCanvas.getContext('2d')
    myCanvas.style.backgroundColor = "white";
    ctx.clearRect(0,0, myCanvas.width, myCanvas.height)
    boardButtonFake.style.backgroundColor = "white"
    brushButtonFake.style.backgroundColor = "#102B5F"

    
    



});



myBoard.enableEventListeners()
const mainDrawingLoop = () => {
    if (myBoard.isDrawingPossible) {
        myBrush.drawCircle(myBoard.drawingInfo.currentX, myBoard.drawingInfo.currentY, myBrush.getBrushColor())
 
        const combainedDrawingInfo = {
            currentX: myBoard.drawingInfo.currentX,
            currentY: myBoard.drawingInfo.currentY,
            currentColor: myBrush.getBrushColor()
            
            
            
        }
        clientSocket.emit("somebodyIsDrawing", combainedDrawingInfo)
    }
    requestAnimationFrame(mainDrawingLoop)


}
mainDrawingLoop()


const otherClientBrush = new Brush( 4, "green", "pencil", myBoard.getCanvas());
clientSocket.on("serveremittedDrawingInfo", (receivedDrawingInfo) => {
    console.log(receivedDrawingInfo)
    otherClientBrush.drawCircle(receivedDrawingInfo.currentX, receivedDrawingInfo.currentY, receivedDrawingInfo.color)
})