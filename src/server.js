const path = require('path');
const serversideSocketIO = require('socket.io')

const express = require('express');
const app = express();
app.use(express.static('public'))


app.use('/chatPage', (reqest, response, next) => {
    console.log(path.resolve(__dirname, '../', 'public', 'chat.html'));
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
        serversideIO.emit("serveremittedDrawingInfo", drawingInfo)
    })

    clientSocket.on("slideButtonClicked", () => {
        serversideIO.emit("showSlide")

    })





})

/*clientSocket.on('serveremittingslideButton', (slideButtonWorked)=>{
    console.log(slideButtonWorked)
})*/

