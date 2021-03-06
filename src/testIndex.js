const Brush = require("./classes/brush").Brush;
const Board = require("./classes/board").Board;

const drawingCanvas = document.getElementById("canvas");
const myBoard = new Board(drawingCanvas, 100, 200, "white");

console.log("board created hoilo");
const myBrush = new Brush(2, "black", "kolom", myBoard.getCanvas());
const boardButtonReal = document.getElementById("boardButtonReal");
const boardButtonFake = document.getElementById("boardButtonFake");
const brushButtonReal = document.getElementById("brushButtonReal");
const brushButtonFake = document.getElementById("brushButtonFake");
var eraseButton = document.getElementById("eraseButton");

brushButtonReal.style.opacity = 0;
brushButtonFake.addEventListener("click", (e) => {
  brushButtonReal.click();
});

brushButtonFake.addEventListener("change", (e) => {
  brushButtonFake.style.backgroundColor = e.target.value;

  myBrush.setBrushColor(e.target.value);
  clientSocket.emit("emitBrushColorChange", e.target.value);
});

clientSocket.on("serverEmitBrushColorChange", (brushColorChage) => {
  brushButtonFake.style.backgroundColor = brushColorChage;

  brushButtonFake.style.backgroundColor = brushColorChage;
  myBrush.setBrushColor(brushColorChage);
});

boardButtonReal.style.opacity = 0;
boardButtonFake.addEventListener("click", () => {
  boardButtonReal.click();
});

boardButtonFake.addEventListener("change", (e) => {
  boardButtonFake.style.backgroundColor = e.target.value;
  myBoard.setBoardColor(e.target.value);
  clientSocket.emit("emitBoardColorChange", e.target.value);
});

clientSocket.on("serverEmitBoardColorChange", (boardColorChage) => {
  boardButtonFake.style.backgroundColor = boardColorChage;

  boardButtonFake.style.backgroundColor = boardColorChage;
  myBoard.setBoardColor(boardColorChage);
});

const eraseButtonClickedInfo = () => {
  const myCanvas = document.getElementById("canvas");
  const ctx = myCanvas.getContext("2d");

  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  brushButtonFake.style.backgroundColor = "#102B5F";
};

const eraseButtonClicked = () => {
  eraseButtonClickedInfo();
  clientSocket.emit("eraseButtonPress");
};

eraseButton.addEventListener("click", eraseButtonClicked);

clientSocket.on("eraseButtonDown", () => {
  eraseButtonClickedInfo();
});

var slideButton = document.getElementById("slideButton");
var canvas = document.getElementById("canvas");

var voiceButton = document.getElementById("voiceButton");
var slideContainer = document.getElementById("slideContainer");
var my_pdf_viewer = document.getElementById("my_pdf_viewer");
var drawingBoard = document.getElementById("drawingBoard");

slideButtonClicked_props = {
  canvasDisplay: "none",
  boardButtonFakeDisplay: "none",
  brushButtonFakeDisplay: "none",
  eraseButtonDisplay: "none",
  documentBackgroundColor: "white",
  voiceButtonMarginTop: "-600px",
  voiceButtonDisplay: "block",
  slideContainerDisplay: "block",
  slideButtonBackgroundColor: "#C9C9C9",
  slideButtonColor: "white",
  drawingBoardBackgroundColor: "white",
  my_pdf_viewerDisplay: "block",
  drawingBoardColor: "#C9C9C9",
};

const changeProps_slideButtonClicked = () => {
  canvas.style.display = slideButtonClicked_props.canvasDisplay;
  boardButtonFake.style.display = slideButtonClicked_props.boardButtonFakeDisplay;
  brushButtonFake.style.display = slideButtonClicked_props.brushButtonFakeDisplay;
  eraseButton.style.display = slideButtonClicked_props.eraseButtonDisplay;
  document.body.style.backgroundColor = slideButtonClicked_props.documentBackgroundColor;
  voiceButton.style.marginTop = slideButtonClicked_props.voiceButtonMarginTop;
  voiceButton.style.display = slideButtonClicked_props.voiceButtonDisplay;
  slideContainer.style.display = slideButtonClicked_props.slideContainerDisplay;
  slideButton.style.backgroundColor = slideButtonClicked_props.slideButtonBackgroundColor;
  slideButton.style.color = slideButtonClicked_props.slideButtonColor;
  drawingBoard.style.backgroundColor = slideButtonClicked_props.drawingBoardBackgroundColor;
  my_pdf_viewer.style.display = slideButtonClicked_props.my_pdf_viewerDisplay;
  drawingBoard.style.color = slideButtonClicked_props.drawingBoardColor;
};

slideButton.addEventListener("click", handleSlideButtonClick);

function handleSlideButtonClick() {
  changeProps_slideButtonClicked();
  clientSocket.emit("slideButtonClicked");
}

clientSocket.on("showSlide", () => {
  changeProps_slideButtonClicked();
});

boardButtonClicked_props = {
  canvasDisplay: "block",
  slideContainerDisplay: "none",
  boardButtonFakeDisplay: "block",
  brushButtonFakeDisplay: "block",
  eraseButtonDisplay: "block",
  voiceButtonMarginTop: "5px",

  eraseButtonMarginTop: "10px",
  drawingBoardBackgroundColor: "#C9C9C9",
  drawingBoardColor: "white",
  slideButtonBackgroundColor: "white",
  my_pdf_viewerDisplay: "none",
  slideButtonColor: "#C9C9C9",
};

const changeprops_boardButtonClicked = () => {
  canvas.style.display = boardButtonClicked_props.canvasDisplay;
  slideContainer.style.display = boardButtonClicked_props.slideContainerDisplay;
  boardButtonFake.style.display = boardButtonClicked_props.boardButtonFakeDisplay;
  brushButtonFake.style.display = boardButtonClicked_props.brushButtonFakeDisplay;
  eraseButton.style.display = boardButtonClicked_props.eraseButtonDisplay;
  voiceButton.style.marginTop = boardButtonClicked_props.voiceButtonMarginTop;
  eraseButton.style.marginTop = boardButtonClicked_props.eraseButtonMarginTop;
  drawingBoard.style.backgroundColor = boardButtonClicked_props.drawingBoardBackgroundColor;
  drawingBoard.style.color = boardButtonClicked_props.drawingBoardColor;
  slideButton.style.backgroundColor = boardButtonClicked_props.slideButtonBackgroundColor;
  my_pdf_viewer.style.display = boardButtonClicked_props.my_pdf_viewerDisplay;
  slideButton.style.color = boardButtonClicked_props.slideButtonColor;
};

// [TO do] relocate this line in a decent place
window.addEventListener("load", () => {
  changeprops_boardButtonClicked();
});

drawingBoard.addEventListener("click", handleBoardButtonClicked);

function handleBoardButtonClicked() {
  changeprops_boardButtonClicked();
  clientSocket.emit("boardButtonClicked");
}

clientSocket.on("showBoard", () => {
  changeprops_boardButtonClicked();
});

myBoard.enableEventListeners();
const mainDrawingLoop = () => {
  if (myBoard.isDrawingPossible) {
    myBrush.drawCircle(myBoard.drawingInfo.currentX, myBoard.drawingInfo.currentY, myBrush.getBrushColor());

    const combainedDrawingInfo = {
      currentX: myBoard.drawingInfo.currentX,
      currentY: myBoard.drawingInfo.currentY,
      currentColor: myBrush.getBrushColor(),
    };

    myBoard._updateBoardColor(myBoard.getBoardColor());
    const drawingBoardColor = {
      currentBoardColor: myBoard.getBoardColor(),
    };

    clientSocket.emit("someoneColoringBoard", drawingBoardColor);

    clientSocket.emit("somebodyIsDrawing", combainedDrawingInfo);
  }
  requestAnimationFrame(mainDrawingLoop);
};
mainDrawingLoop();

const otherClientBoard = new Board(drawingCanvas, 500, 400, "white");
clientSocket.on("serverEmittingBoardColor", (receivedBoardColorInfo) => {
  console.log(receivedBoardColorInfo);

  otherClientBoard._updateBoardColor(receivedBoardColorInfo.currentBoardColor);
});

const otherClientBrush = new Brush(4, "green", "pencil", myBoard.getCanvas());
clientSocket.on("serveremittedDrawingInfo", (receivedDrawingInfo) => {
  console.log("to see the color of the brush\n");
  console.log(receivedDrawingInfo);
  otherClientBrush.drawCircle(
    receivedDrawingInfo.currentX,
    receivedDrawingInfo.currentY,
    receivedDrawingInfo.currentColor
  );
});
