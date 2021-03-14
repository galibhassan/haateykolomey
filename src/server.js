const path = require("path");
const formatMessage = require("../utils/message");

const serversideSocketIO = require("socket.io");
// const cors = require('cors')

const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded());

const server = app.listen(8000, () => {
  console.log("listening to port 8000");
});
const serversideIO = serversideSocketIO(server);
app.set("socketio", serversideIO);

const loginRoutes = require("./routes/login");
const loginFailedRoutes = require("./routes/loginFailed");
const registerRoutes = require("./routes/register");
const registerFailedRoutes = require("./routes/registerFailed");
const homeRoutes = require("./routes/home");
const createChatRoutes = require("./routes/createChatRoom");
const joinChatRoutes = require("./routes/joinChatRoom")
const chatSessionRoutes = require("./routes/chatSession");
//const userName = require('../public/chat')
//var clientName = document.getElementById('clientName')
var username = "USER";
//var username = clientName.innerHTML

app.use(loginRoutes);
app.use(loginFailedRoutes);
app.use(registerRoutes);
app.use(registerFailedRoutes);
app.use(homeRoutes);
app.use(createChatRoutes);
app.use(joinChatRoutes)
app.use(chatSessionRoutes);
app.use(express.static("public"));

app.use("/chatPage", (reqest, response, next) => {
  response.render("chat", {
    firstname: "JeLoginKorbe",
    lastname: "Shey",
  });
});

serversideIO.on("connection", (clientSocket) => {
  clientSocket.on("userJoined", (ro) => {
    const { roomName, userId } = ro;
    clientSocket.join(roomName);
    console.log(ro)
    // console.log(JSON.stringify(serversideIO.sockets.adapter.rooms, null, 2))
  });

  console.log("just joined: socket.id: " + clientSocket.id);

  clientSocket.on("somoneSaidSomething", (roFromOneClient) => {
    const { roomName } = roFromOneClient;
    serversideIO.to(roomName).emit("serverEmittingSomeonesWords", roFromOneClient);
  });

  clientSocket.on("somebodyIsDrawing", (drawingInfo) => {
    console.log(drawingInfo);
    const { roomName } = drawingInfo;
    clientSocket.to(roomName).broadcast.emit("serveremittedDrawingInfo", drawingInfo);
  });

  clientSocket.on("emitBrushColorChange", (ro) => {
    const { roomName } = ro;
    clientSocket.to(roomName).broadcast.emit("serverEmitBrushColorChange", ro.eventTargetValue);
  });

  clientSocket.on("someoneColoringBoard", (boardColorInfo) => {
    const { roomName } = boardColorInfo;
    clientSocket.to(roomName).broadcast.emit("serverEmittingBoardColor", boardColorInfo);
  });

  clientSocket.on("emitBoardColorChange", (ro) => {
    const { roomName } = ro;
    clientSocket.to(roomName).broadcast.emit("serverEmitBoardColorChange", ro.eventTargetValue);
  });

  clientSocket.on("slideButtonClicked", (ro) => {
    serversideIO.to(ro.roomName).emit("showSlide");
  });

  clientSocket.on("nextButtonClicked", (ro) => {
    clientSocket.to(ro.roomName).broadcast.emit("goToNextPage");
  });

  clientSocket.on("prevButtonClicked", (ro) => {
    clientSocket.to(ro.roomName).broadcast.emit("goToPrevButton");
  });

  clientSocket.on("pageNumberEntered", ({desiredPage, roomName}) => {
    console.log(desiredPage);
    clientSocket.to(roomName).broadcast.emit("pressEnter", desiredPage);
  });

  clientSocket.on("zoomInClicked", ({roomName}) => {
      clientSocket.to(roomName).broadcast.emit("zoomIn");
    });
    
    clientSocket.on("zoomOutClicked", ({roomName}) => {
        clientSocket.to(roomName).broadcast.emit("zoomOut");
    });
    
    clientSocket.on("boardButtonClicked", ({roomName}) => {
        serversideIO.to(roomName).emit("showBoard");
    });
    
    clientSocket.on("eraseButtonPress", ({roomName}) => {
        serversideIO.to(roomName).emit("eraseButtonDown");
    });
    
    clientSocket.on("appearPdf", (ro) => {
        const {roomName, pdfUrlInputValue: myPdfPath} = ro; 
        console.log(myPdfPath);
        clientSocket.to(roomName).broadcast.emit("receivePdf", myPdfPath);
    });
    
    /* 
    
    clientSocket.broadcast.emit('message', formatMessage(username , 'has joined the chat'))
    clientSocket.on('disconnect', ()=>{
        serversideIO.emit('message', formatMessage(username, 'has left the chat') )
    })
    
 */
});

//serversideIo.emit('message', "A user has left the chat")

// module.exports = serversideIO
