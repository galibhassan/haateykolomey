var clientChatInput = document.getElementById('clientChatInput')
var sendButton = document.getElementById('sendButton')
var chatOutput = document.getElementById('chatOutput')
var clientName = document.getElementById('clientName')
var userName = clientName.innerHTML
var roomName = document.getElementById('roomName')
var roomPassword = document.getElementById('roomPassword')

window.addEventListener('load', ()=>{
    clientSocket.emit("userJoined", {
        roomName: roomName.innerText
    })
})

sendButton.addEventListener('click', () => {
    clientSocket.emit('somoneSaidSomething', {
            clientName: clientName.innerHTML,
            chatboxMessage: clientChatInput.innerHTML,
            roomName: roomName.innerText
        }
    );
     clientChatInput.innerHTML = ''
     var name = clientName.innerHTML.split(" ");
     
  })

clientSocket.on('serverEmittingSomeonesWords', (roFromServer) => {
    pushChatPortionToChatOutput(roFromServer)

})



clientSocket.on('message', (message)=>{
    console.log(message)
    userConnectionInfo(message)
    chatOutput.scrollTop= chatOutput.scrollHeight
})


function userConnectionInfo(message){
    const div = document.createElement('div')
    div.innerHTML = `<p>at ${message.time}</p>
    <p>${message.username} ${message.text}</p>`
    document.getElementById('chatOutput').appendChild(div)
}


function pushChatPortionToChatOutput(ro){
    var firstLastCharecterDiv = document.createElement("div")
    var usernameDiv = document.createElement("div")
    var messageDiv = document.createElement("div")
    var chatPortionContainer = document.createElement("div")

    firstLastCharecterDiv.innerHTML = getInitials(ro.clientName);
    
    usernameDiv.innerHTML = ro.clientName
    messageDiv.innerHTML = ro.chatboxMessage

    Array.from(messageDiv.children).forEach((child) =>{
        child.style.all = 'unset';
    })
    
    firstLastCharecterDiv.setAttribute("class", "userIntial")
    usernameDiv.setAttribute("class", "usernameDiv")
    messageDiv.setAttribute("class", "chatChunk")
    chatPortionContainer.setAttribute("class", "chatContainer")

    chatPortionContainer.appendChild(firstLastCharecterDiv)
    chatPortionContainer.appendChild(usernameDiv)
    chatPortionContainer.appendChild(messageDiv)

    chatOutput.appendChild(chatPortionContainer)
}

function getInitials(username) {
    var firstName = username.split(" ")[0];
    var lastName = username.split(" ")[1];
    var intials = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
    return intials;
}


    
//module.exports = userName