var clientChatInput = document.getElementById("clientChatInput");
var sendButton = document.getElementById("sendButton");
var chatOutput = document.getElementById("chatOutput");
var clientName = document.getElementById("clientName");
var userName = clientName.innerHTML;
var roomName = document.getElementById("roomName");
var roomPassword = document.getElementById("roomPassword");

window.addEventListener("load", () => {
  const constraints = { audio: false, video: { width: 100, height: 70 } };
  const videobox = document.querySelector(".videobox");

  function addVideoStream(myVid, stream) {
    myVid.muted = true;
    myVid.srcObject = stream;
    myVid.addEventListener("loadedmetadata", () => {
      myVid.play();
    });
    videobox.append(myVid);
  }

  const addVideo = (constraints) => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        const myVid = document.createElement("video");
        addVideoStream(myVid, stream);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addVideo(constraints);

  /* const peer = new Peer(undefined, {
        host: '/',
        port: '8001'
    }) 
    
    peer.on('open', (id)=>{
        console.log("peer id: " + id)
        // addVideo(constraints)
        clientSocket.emit("userJoined", {
            roomName: roomName.innerText,
            userId: id
        })
    })
    */
});

sendButton.addEventListener("click", () => {
  clientSocket.emit("somoneSaidSomething", {
    clientName: clientName.innerHTML,
    chatboxMessage: clientChatInput.innerHTML,
    roomName: roomName.innerText,
  });
  clientChatInput.innerHTML = "";
  var name = clientName.innerHTML.split(" ");
});

clientSocket.on("serverEmittingSomeonesWords", (roFromServer) => {
  pushChatPortionToChatOutput(roFromServer);
});

clientSocket.on("message", (message) => {
  console.log(message);
  userConnectionInfo(message);
  chatOutput.scrollTop = chatOutput.scrollHeight;
});

function userConnectionInfo(message) {
  const div = document.createElement("div");
  div.innerHTML = `<p>at ${message.time}</p>
    <p>${message.username} ${message.text}</p>`;
  document.getElementById("chatOutput").appendChild(div);
}

function pushChatPortionToChatOutput(ro) {
  var firstLastCharecterDiv = document.createElement("div");
  var usernameDiv = document.createElement("div");
  var messageDiv = document.createElement("div");
  var chatPortionContainer = document.createElement("div");

  firstLastCharecterDiv.innerHTML = getInitials(ro.clientName);

  usernameDiv.innerHTML = ro.clientName;
  messageDiv.innerHTML = ro.chatboxMessage;

  Array.from(messageDiv.children).forEach((child) => {
    child.style.all = "unset";
  });

  firstLastCharecterDiv.setAttribute("class", "userIntial");
  usernameDiv.setAttribute("class", "usernameDiv");
  messageDiv.setAttribute("class", "chatChunk");
  chatPortionContainer.setAttribute("class", "chatContainer");

  chatPortionContainer.appendChild(firstLastCharecterDiv);
  chatPortionContainer.appendChild(usernameDiv);
  chatPortionContainer.appendChild(messageDiv);

  chatOutput.appendChild(chatPortionContainer);
}

function getInitials(username) {
  var firstName = username.split(" ")[0];
  var lastName = username.split(" ")[1];
  var intials = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  return intials;
}

//module.exports = userName
