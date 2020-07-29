var clientChatInput = document.getElementById('clientChatInput')
var sendButton = document.getElementById('sendButton')
var chatOutput = document.getElementById('chatOutput')
var clientName = document.getElementById('clientName')



sendButton.addEventListener('click', () => {
    clientSocket.emit('somoneSaidSomething', {
            clientName: clientName.value,
            chatboxMessage: clientChatInput.innerHTML
        }
    );
     clientChatInput.innerHTML = ''
     var name = clientName.value.split(" ");
     
  })

clientSocket.on('serverEmittingSomeonesWords', (roFromServer) => {
    pushChatPortionToChatOutput(roFromServer)

})

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

