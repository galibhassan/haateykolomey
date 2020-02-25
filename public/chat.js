var clientChatInput = document.getElementById('clientChatInput')
var sendButton = document.getElementById('sendButton')
var chatOutput = document.getElementById('chatOutput')
var clientName = document.getElementById('clientName')



sendButton.addEventListener('click', () => {
    clientSocket.emit('somoneSaidSomething', {
            clientName: clientName.value,
            chatboxMessage: clientChatInput.value
        }
    );
    clientChatInput.value = ''
})

clientSocket.on('serverEmittingSomeonesWords', (roFromServer) => {
    console.log('roFromServer: ')
    console.log(roFromServer)

    var clientMessage = `<span class="clientMessage"> ${roFromServer.chatboxMessage} </span>`;
    var clientName = roFromServer.clientName;
    chatOutput.innerHTML += '<br/>' + clientName+ ': ' + clientMessage;
})
