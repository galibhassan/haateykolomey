const path = require('path');
const formatMessage = require('../utils/message');

const serversideSocketIO = require('socket.io')
// const cors = require('cors')

const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded());


const server = app.listen(8000, () => {
    console.log('listening to port 8000')
})
const serversideIO = serversideSocketIO(server);
app.set('socketio', serversideIO)

const loginRoutes = require('./routes/login')
const loginFailedRoutes = require('./routes/loginFailed')
const registerRoutes = require('./routes/register')
const registerFailedRoutes = require('./routes/registerFailed')
const homeRoutes = require('./routes/home')
const createChatRoutes = require('./routes/createChatRoom')
const chatSessionRoutes = require('./routes/chatSession')
//const userName = require('../public/chat')
//var clientName = document.getElementById('clientName')
var username = 'USER'
//var username = clientName.innerHTML




app.use(loginRoutes);
app.use(loginFailedRoutes);
app.use(registerRoutes);
app.use(registerFailedRoutes);
app.use(homeRoutes);
app.use(createChatRoutes);
app.use(chatSessionRoutes)
app.use(express.static('public'))

app.use('/chatPage', (reqest, response, next) => {
    response.render('chat', {
        firstname:"JeLoginKorbe",
        lastname: "Shey"
    })
})





serversideIO.on('connection', (clientSocket) => {

    clientSocket.on('userJoined', (ro) =>{
        const {roomName} = ro;
        clientSocket.join(roomName)
        // console.log(JSON.stringify(serversideIO.sockets.adapter.rooms, null, 2))
    })

    console.log('just joined: socket.id: ' + clientSocket.id)

    clientSocket.on("somoneSaidSomething", (roFromOneClient) => {
        const {roomName} = roFromOneClient;
        serversideIO.to(roomName).emit("serverEmittingSomeonesWords", roFromOneClient);
      });
      

/* 
      
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
    
    
    clientSocket.broadcast.emit('message', formatMessage(username , 'has joined the chat'))
    clientSocket.on('disconnect', ()=>{
        serversideIO.emit('message', formatMessage(username, 'has left the chat') )
    })
    
 */
    

})



//serversideIo.emit('message', "A user has left the chat")

// module.exports = serversideIO
