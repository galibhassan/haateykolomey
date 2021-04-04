var clientChatInput = document.getElementById("clientChatInput");
var sendButton = document.getElementById("sendButton");
var chatOutput = document.getElementById("chatOutput");
var clientName = document.getElementById("clientName");
let VID_ID = null;
let isShowingVidForFirstTime = true;
const voiceButton = document.getElementById("voiceButton");
var userName = clientName.innerHTML;
var roomName = document.getElementById("roomName");
var roomPassword = document.getElementById("roomPassword");
var roomPassword = document.getElementById("userButton");

const getRandomColor = () => {
  const r = Math.floor(Math.random()*255);
  const g = Math.floor(Math.random()*255);
  const b = Math.floor(Math.random()*255);

  const UPPER_LIMIT = 230;
  let outputColor = null;
  
  if(r>UPPER_LIMIT && g>UPPER_LIMIT && b>UPPER_LIMIT) {
    outputColor = getRandomColor()
  } else {
    outputColor = `rgb(${r},${g},${b})`
  }
  return outputColor
}
const userColor = getRandomColor();


window.addEventListener("load", () => {
  const constraints = { audio: false, video: { width: 100, height: 70 } };
  const videobox = document.querySelector(".videobox");
  
  let isVideoOn = false;

  const peer = new Peer(undefined, {
    host: "/",
    port: "8001",
  });

  const getVidId = (clientName) => {
    return `vid_${clientName.innerText.replace(" ", "_")}`
  }

  const addVideo = (constraints, vidId) => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        let myVid;
        if(vidId === null) {
          vidId = getVidId(clientName);
          VID_ID = vidId;
        }
        if(isShowingVidForFirstTime) {
          myVid = document.createElement("video");
          myVid.setAttribute("id", vidId);
        } else {
          myVid = document.getElementById(vidId);
        }


        addVideoStream(myVid, stream, videobox);

        peer.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (otheruservideoStream) => {
            setTimeout(addVideoStream, 200, document.createElement("video"), otheruservideoStream, videobox);
          });
        });

        clientSocket.on("user-connected", (otherUserId) => {
          // connectToNewUser(otherUserId, stream, peer, videobox);
          setTimeout(connectToNewUser, 200, otherUserId, stream, peer, videobox);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };



  clientSocket.on("videoTurnedOn", (ro)=>{
    const {vidId} = ro;
    addVideo(constraints, vidId)    
  })
  clientSocket.on("videoTurnedOff", (ro)=>{
    const {vidId} = ro;
    let jeiVideoTaTurnOffKorteHobey = document.getElementById(vidId);
    const tracks =  jeiVideoTaTurnOffKorteHobey.srcObject.getVideoTracks()
    for(let i=0; i<tracks.length; i++) {
      tracks[i].stop();
    }
    // jeiVideoTaTurnOffKorteHobey.srcObject = null;
  })

  voiceButton.innerHTML = `<i class="fas fa-video-slash"></i>`
  voiceButton.addEventListener('click', (e) => {
    if(isVideoOn) {
      // toggle isVideoOn value
      isVideoOn = false;
      // emit video-turn-off event
      clientSocket.emit("videoTurnedOff", {
        vidId: getVidId(clientName)
      })
      // show placeholder in video
      // show video icon in crossed state
      voiceButton.innerHTML = `<i class="fas fa-video-slash"></i>`
    } else{
      // make the video on
      clientSocket.emit("videoTurnedOn", {
        vidId: getVidId(clientName)
      })

      voiceButton.innerHTML = `<i class="fas fa-video"></i>`
      
      // toggle isVideoOn value
      isVideoOn = true
  
    }
  })




  peer.on("open", (id) => {
    console.log("peer id: " + id);
    // addVideo(constraints)
    clientSocket.emit("userJoined", {
      roomName: roomName.innerText,
      userId: id,
    });
  });
});

sendButton.addEventListener("click", () => {
  clientSocket.emit("somoneSaidSomething", {
    clientName: clientName.innerText,
    chatboxMessage: clientChatInput.innerHTML,
    roomName: roomName.innerText,
    clientColor: userColor
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
  div.innerHTML = `<p> ${message.time}</p>
    <p>${message.username} ${message.text}</p>`;
  document.getElementById("chatOutput").appendChild(div);
  div.setAttribute("class", "userJoinedTime")
}

function pushChatPortionToChatOutput(ro) {
  var firstLastCharecterDiv = document.createElement("div");
  var usernameDiv = document.createElement("div");
  var messageDiv = document.createElement("div");
  var chatPortionContainer = document.createElement("div");

  firstLastCharecterDiv.innerHTML = getInitials(ro.clientName);

  usernameDiv.innerHTML = ro.clientName;
  messageDiv.innerHTML = ro.chatboxMessage;

  // removing copy-pasted style
  Array.from(messageDiv.children).forEach((child) => {
    child.style.all = "unset";
  });

  firstLastCharecterDiv.setAttribute("class", "userIntial");
  firstLastCharecterDiv.style.background = ro.clientColor;
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

function connectToNewUser(otherUserId, myStream, peer, videobox) {
  // send my video stream to otherUser
  const call = peer.call(otherUserId, myStream);
  console.log("otherUserId: ", otherUserId);

  // get other user's video stream
  const otherUserVideoElement = document.createElement("video");
  call.on("stream", (otherUserStream) => {
    // append otherUserStream to my DOM
    addVideoStream(otherUserVideoElement, otherUserStream, videobox);
  });
  call.on("close", () => {
    otherUserVideoElement.remove();
  });
}

function addVideoStream(myVid, stream, videobox) {
  if(isShowingVidForFirstTime) {
    const vidContainer = document.createElement("div")
    const whoseVid = document.createElement("div")
    whoseVid.innerHTML = clientName.innerText;
    
    vidContainer.appendChild(myVid);
    vidContainer.appendChild(whoseVid);
    // styling
    myVid.classList.add("video-element");
    vidContainer.classList.add("video-container")
    whoseVid.classList.add("video-broadcaster-name");  
    videobox.append(vidContainer);
    isShowingVidForFirstTime = false
  }
        

  myVid.muted = true;
  myVid.srcObject = stream;
  


  myVid.addEventListener("loadedmetadata", () => {
    myVid.play();
  });
}
