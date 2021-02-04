const express = require("express");
const router = express.Router();
const randomString = require("randomstring");

const PASSWORD_LENGTH = 16;

router.post("/createChatRoom", (req, res, next) => {
  const serversideIO = req.app.get("socketio");
  const roomPassword = randomString.generate(PASSWORD_LENGTH);
  const { roomName } = req.body;
  roomNameSanitized = roomName.trim().replace(/ /g, "");
//  roomNameSanitized = roomNameSanitized;

  serversideIO.on("connection", (clientSocket) => {

    clientSocket.join(roomNameSanitized);

    clientSocket.on("somoneSaidSomething", (roFromOneClient) => {
      serversideIO.emit("serverEmittingSomeonesWords", roFromOneClient);
    });

    clientSocket.on("somebodyIsDrawing", (drawingInfo) => {
      console.log(drawingInfo);
      clientSocket.to(roomNameSanitized).broadcast.emit("serveremittedDrawingInfo", drawingInfo);
    });

    clientSocket.on("someoneColoringBoard", (boardColorInfo) => {
      clientSocket.to(roomNameSanitized).broadcast.emit("serverEmittingBoardColor", boardColorInfo);
    });

    clientSocket.on("emitBoardColorChange", (boardColorChange) => {
      clientSocket.to(roomNameSanitized).broadcast.emit("serverEmitBoardColorChange", boardColorChange);
    });

    clientSocket.on("emitBrushColorChange", (brushColorChange) => {
      clientSocket.to(roomNameSanitized).broadcast.emit("serverEmitBrushColorChange", brushColorChange);
    });

    clientSocket.on("slideButtonClicked", () => {
      serversideIO.to(roomNameSanitized).emit("showSlide");
    });

    clientSocket.on("nextButtonClicked", () => {
      clientSocket.to(roomNameSanitized).broadcast.emit("goToNextPage");
    });

    clientSocket.on("prevButtonClicked", () => {
      clientSocket.to(roomNameSanitized).broadcast.emit("goToPrevButton");
    });

    clientSocket.on("pageNumberEntered", (desiredPage) => {
      console.log(desiredPage);
      clientSocket.to(roomNameSanitized).broadcast.emit("pressEnter", desiredPage);
    });

    clientSocket.on("zoomInClicked", () => {
      clientSocket.to(roomNameSanitized).broadcast.emit("zoomIn");
    });

    clientSocket.on("zoomOutClicked", () => {
      clientSocket.to(roomNameSanitized).broadcast.emit("zoomOut");
    });

    clientSocket.on("boardButtonClicked", () => {
      serversideIO.to(roomNameSanitized).emit("showBoard");
    });

    clientSocket.on("eraseButtonPress", () => {
      serversideIO.to(roomNameSanitized).emit("eraseButtonDown");
    });

    clientSocket.on("appearPdf", (myPdfPath) => {
      console.log(myPdfPath);
      clientSocket.to(roomNameSanitized).broadcast.emit("receivePdf", myPdfPath);
    });
  });

  res.redirect(`chatsession/${roomNameSanitized}/${roomPassword}`);
});

module.exports = router;
