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

const loginRoutes = require('./routes/login')
const loginFailedRoutes = require('./routes/loginFailed')
const registerRoutes = require('./routes/register')
const registerFailedRoutes = require('./routes/registerFailed')
const homeRoutes = require('./routes/home')
const createChatRoutes = require('./routes/createChatRoom')
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
app.use(express.static('public'))

app.use('/chatPage', (reqest, response, next) => {
    response.render('chat', {
        firstname:"JeLoginKorbe",
        lastname: "Shey"
    })
})





serversideIO.on('connection', (clientSocket) => {

    clientSocket.on('somoneSaidSomething', (roFromOneClient) => {
        serversideIO.emit('serverEmittingSomeonesWords', roFromOneClient)
        
        
    })
    clientSocket.on("somebodyIsDrawing", (drawingInfo) => {
        console.log(drawingInfo)
        clientSocket.broadcast.emit("serveremittedDrawingInfo", drawingInfo)
    })

    clientSocket.on("someoneColoringBoard", (boardColorInfo)=>{
        clientSocket.broadcast.emit("serverEmittingBoardColor", boardColorInfo)
        
    })

    clientSocket.on("emitBoardColorChange", (boardColorChange)=>{
        clientSocket.broadcast.emit("serverEmitBoardColorChange", boardColorChange)
    })

    clientSocket.on("emitBrushColorChange", (brushColorChange)=>{
        clientSocket.broadcast.emit("serverEmitBrushColorChange", brushColorChange)
    })

    clientSocket.on("slideButtonClicked", () => {
        serversideIO.emit("showSlide")

    })

    clientSocket.on("nextButtonClicked", ()=>{
        clientSocket.broadcast.emit('goToNextPage')
    })

    clientSocket.on("prevButtonClicked", ()=>{
        clientSocket.broadcast.emit("goToPrevButton")
    })

    clientSocket.on("pageNumberEntered", (desiredPage)=>{
        console.log(desiredPage)
       clientSocket.broadcast.emit("pressEnter", desiredPage)
    })

    clientSocket.on("zoomInClicked", ()=>{
        clientSocket.broadcast.emit("zoomIn")
    })

    clientSocket.on("zoomOutClicked", ()=>{
        clientSocket.broadcast.emit("zoomOut")
    })

    clientSocket.on("boardButtonClicked", ()=>{
        serversideIO.emit("showBoard")
    })

    
    clientSocket.on("eraseButtonPress", ()=>{
        serversideIO.emit("eraseButtonDown")
    })

    
    clientSocket.on("appearPdf", (myPdfPath) =>{ 
        console.log(myPdfPath)
        clientSocket.broadcast.emit("receivePdf", myPdfPath )
    
    })
    
    
    clientSocket.broadcast.emit('message', formatMessage(username , 'has join the chat'))
    clientSocket.on('disconnect', ()=>{
        serversideIO.emit('message', formatMessage(username, 'has left the chat') )
    })
    

    

})



//serversideIo.emit('message', "A user has left the chat")

// module.exports = serversideIO
