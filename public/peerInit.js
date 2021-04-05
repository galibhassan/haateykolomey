let peerId = null;
const peer = new Peer(undefined, {
  host: "/",
  port: "8001",
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

