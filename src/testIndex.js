const Brush = require('./classes/brush').Brush
const Board = require('./classes/board').Board


const drawingCanvas = document.getElementById("canvas");

// const myBoard = new Board(drawingCanvas, 100, 200);


const myBoard = new Board(drawingCanvas, 100, 200, 'white');


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
brushButtonFake.addEventListener('click', (e) => {
    brushButtonReal.click()
})

brushButtonFake.addEventListener('change', (e) => {
    brushButtonFake.style.backgroundColor = e.target.value
    //myBrush.setBrushColor(colorUserChosen.value)
    myBrush.setBrushColor(e.target.value)

})

boardButtonReal.style.opacity = 0
boardButtonFake.addEventListener('click', (e) => {
    boardButtonReal.click()
})

boardButtonFake.addEventListener('change', (e) => {
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
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
    boardButtonFake.style.backgroundColor = "white"
    brushButtonFake.style.backgroundColor = "#102B5F"






});

var slideButton = document.getElementById("slideButton")
var canvas = document.getElementById("canvas")
//var boardButton = document.getElementById("boardButton")
//var brushButton = document.getElementById("brushButton")
var voiceButton = document.getElementById("voiceButton")
var slideContainer = document.getElementById("slideContainer")
var my_pdf_viewer = document.getElementById('my_pdf_viewer')

let isSlideShowing = false;
let shouldShowSlide


slideButtonClicked_props = {
    canvasDisplay : "none",
    boardButtonFakeDisplay : "none",
    brushButtonFakeDisplay : "none",
    eraseButtonDisplay : "none",
    documentBackgroundColor : "white",
    voiceButtonMarginTop : "-600px",
    voiceButtonDisplay : "block",
    slideContainerDisplay : "block",
    slideButtonBackgroundColor : "#C9C9C9",
    slideButtonColor : "white",
    drawingBoardBackgroundColor : "white",
    my_pdf_viewerDisplay : "block",
    drawingBoardColor : "#C9C9C9"   
}

const changeProps_slideButtonClicked  = ()=>{
    canvas.style.display = slideButtonClicked_props.canvasDisplay
    boardButtonFake.style.display = slideButtonClicked_props.boardButtonFakeDisplay
    brushButtonFake.style.display = slideButtonClicked_props.brushButtonFakeDisplay
    eraseButton.style.display = slideButtonClicked_props.eraseButtonDisplay
    document.body.style.backgroundColor = slideButtonClicked_props.documentBackgroundColor
    voiceButton.style.marginTop = slideButtonClicked_props.voiceButtonMarginTop
    voiceButton.style.display = slideButtonClicked_props.voiceButtonDisplay
    slideContainer.style.display = slideButtonClicked_props.slideContainerDisplay
    slideButton.style.backgroundColor = slideButtonClicked_props.slideButtonBackgroundColor
    slideButton.style.color = slideButtonClicked_props.slideButtonColor
    drawingBoard.style.backgroundColor = slideButtonClicked_props.drawingBoardBackgroundColor
    my_pdf_viewer.style.display = slideButtonClicked_props.my_pdf_viewerDisplay
    drawingBoard.style.color = slideButtonClicked_props.drawingBoardColor

}


slideButton.addEventListener("click", handleSlideButtonClick);

function handleSlideButtonClick() {
    changeProps_slideButtonClicked()
    clientSocket.emit("slideButtonClicked")

}

clientSocket.on("showSlide", ()=>{
    
    changeProps_slideButtonClicked()

})


const boardButtonClicked = () => {
    var drawingBoard = document.getElementById("drawingBoard")
    drawingBoard.addEventListener("click", () => {
        canvas.style.display = "block";
        slideContainer.style.display = "none"
        boardButtonFake.style.display = "block";
        brushButtonFake.style.display = "block";
        eraseButton.style.display = "block";
        voiceButton.style.marginTop = "5px";
        // brushButton.style.marginTop = "-49px";
        eraseButton.style.marginTop = "10px";
        drawingBoard.style.backgroundColor = "#C9C9C9";
        drawingBoard.style.color = "white";
        slideButton.style.backgroundColor = "white";
        my_pdf_viewer.style.display = "none"
        slideButton.style.color = "#C9C9C9"


    });
}

boardButtonClicked();











myBoard.enableEventListeners()
const mainDrawingLoop = () => {
    if (myBoard.isDrawingPossible) {
        myBrush.drawCircle(myBoard.drawingInfo.currentX, myBoard.drawingInfo.currentY, myBrush.getBrushColor())

        const combainedDrawingInfo = {
            currentX: myBoard.drawingInfo.currentX,
            currentY: myBoard.drawingInfo.currentY,
            currentColor: myBrush.getBrushColor(),
            currentBoardColor: myBoard.getBoardColor()


        }


        clientSocket.emit("somebodyIsDrawing", combainedDrawingInfo)


    }
    requestAnimationFrame(mainDrawingLoop)


}
mainDrawingLoop()

//const boardrong = myBoard.setBoardColor(e.target.value)

const otherClientBoard = (e) => {
    new Board(myBoard.getCanvas(), 500, 400, myBoard.setBoardColor(e.target.value))
    ;
}

//const otherClientBoard = new Board( myBoard.getCanvas(), 500, 400,  "purple"  );
clientSocket.on("serverEmittingBoardColor", (receivedBoardColorInfo) => {
    console.log(receivedBoardColorInfo)
    otherClientBoard._updateBoardColor(receivedBoardColorInfo.color)



})
const otherClientBrush = new Brush(4, "green", "pencil", myBoard.getCanvas());
clientSocket.on("serveremittedDrawingInfo", (receivedDrawingInfo) => {
    console.log(receivedDrawingInfo)
    otherClientBrush.drawCircle(receivedDrawingInfo.currentX, receivedDrawingInfo.currentY, receivedDrawingInfo.color)
})


/*clientSocket.on("serverEmittingslideButton", (receivedslideButton) =>{
    //console.log("hola")
    console.log(receivedslideButton)
})*/


/*clientSocket.on('serveremittingslideButton', (slideButtonWorked)=>{
    console.log(slideButtonWorked)
})*/

