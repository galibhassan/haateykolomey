let peerId = null;

// Running the peer server in cloud
// const peer = new Peer(undefined);
// or
// Running the peer server locally
// open terminal and execute: peerjs --port PEERJS_PORT_NUMBER
const PEERJS_PORT_NUMBER = 8001
const peer = new Peer(undefined, {
  host: "/",
  port: PEERJS_PORT_NUMBER,
});

peer.on("open", (id) => {
  console.log("peer id: " + id);
  peerId = id;
  // addPlaceHolderVideo();
  clientSocket.emit("userJoined", {
    roomName: roomName.innerText,
    userId: id,
  });
});

const addPlaceHolderVideo = ()=> {
    const videobox = document.querySelector(".videobox");
    const vidContainer = document.createElement("div");
    const whoseVid = document.createElement("div");
    whoseVid.innerHTML = clientName.innerText;
    
    const myVid = document.createElement("video");
    myVid.srcObject = null;
    myVid.muted = true;
    myVid.width = 100;
    myVid.height = 70;
    myVid.style.backgroundColor = "gray"
    myVid.id = getVidId(clientName);

    vidContainer.appendChild(myVid);
    vidContainer.appendChild(whoseVid);
    // styling
    myVid.classList.add("video-element");
    vidContainer.classList.add("video-container");
    whoseVid.classList.add("video-broadcaster-name");
    videobox.append(vidContainer);
    // isShowingVidForFirstTime = false;
}

