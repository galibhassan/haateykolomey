const path = require('path');
const serversideSocketIO = require('socket.io')
const cors = require('cors')

const express = require('express');
const app = express();

app.use(cors());
app.use(express.static('public'))


app.use('/chatPage', (reqest, response, next) => {
    // console.log(path.resolve(__dirname, '../', 'public', 'chat.html'));
    response.sendFile(path.resolve(__dirname, '../', 'public', 'chat.html'))
})

app.use('/', (reqest, response, next) => {
    response.sendFile(path.resolve(__dirname, '../', 'public', 'index.html'))
})




const server = app.listen(8000, () => {
    console.log('listening to port 8000')
})

const serversideIO = serversideSocketIO(server);
serversideIO.on('connection', (clientSocket) => {
    // console.log('connection established with:')
    // console.log(clientSocket.id);

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

    
    


})


