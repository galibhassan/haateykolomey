let VID_ID = null;
let isShowingVidForFirstTime = true;
const voiceButton = document.getElementById("voiceButton");
const constraints = { audio: false, video: { width: 100, height: 70 } };
const videobox = document.querySelector(".videobox");

let isVideoOn = false;

const getVidId = (clientName) => {
  return `vid_${clientName.innerText.replace(" ", "_")}`;
};

const getMyMediaStream = () => {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.getUserMedia(constraints)
    .then(myMediaStream => {
      resolve(myMediaStream)
    })
    .catch(err=>{
      console.log(err)
    })
  })
}

const addVideo = (stream, streamerId, streamerName)=> {
  const videobox = document.querySelector(".videobox");
  const vidContainer = document.createElement("div");
  const whoseVid = document.createElement("div");
  whoseVid.innerHTML = streamerName;
  
  const streamerVid = document.createElement("video");
  streamerVid.srcObject = stream;
  streamerVid.muted = true;
  // streamerVid.width = 100;
  // streamerVid.height = 70;
  // streamerVid.style.backgroundColor = "gray"
  // streamerVid.id = getVidId(clientName);
  streamerVid.id = streamerId;

  vidContainer.appendChild(streamerVid);
  vidContainer.appendChild(whoseVid);
  // styling
  streamerVid.classList.add("video-element");
  vidContainer.classList.add("video-container");
  whoseVid.classList.add("video-broadcaster-name");
  videobox.append(vidContainer);

  streamerVid.addEventListener("loadedmetadata", ()=>{
    streamerVid.play();
  })

  // isShowingVidForFirstTime = false;
}

getNameFromVidId = (vidId) => {
  const arrayfiedVidiD = vidId.split("_");
  return arrayfiedVidiD[1] + " " + arrayfiedVidiD[2]
}

clientSocket.on("someoneTurnedOnVideo", async (ro) => {
  const { vidId, peerId } = ro;
  console.log(vidId);
  const myStream = await getMyMediaStream();
  const call = peer.call(peerId, myStream)
  call.on("stream", (otherUserStream)=>{
    addVideo(otherUserStream, peerId, getNameFromVidId(vidId))
  })
});

peer.on("call", async (call)=>{
  const myMediaStream = await getMyMediaStream();
  call.answer(myMediaStream);
})

clientSocket.on("someoneTurnedOffVideo", (ro) => {
  const {peerId:otherPeerId, vidId } = ro;
  let jeiVideoTaTurnOffKorteHobey = document.getElementById(otherPeerId);
  const tracks = jeiVideoTaTurnOffKorteHobey.srcObject.getVideoTracks();
  for (let i = 0; i < tracks.length; i++) {
    tracks[i].stop();
  }
  jeiVideoTaTurnOffKorteHobey.srcObject = null;
  jeiVideoTaTurnOffKorteHobey.parentElement.remove();
});

voiceButton.innerHTML = `<i class="fas fa-video-slash"></i>`;
voiceButton.addEventListener("click", async (e) => {
  if (isVideoOn) {
    // toggle isVideoOn value
    isVideoOn = false;

    // turn off my video
    const myVid = document.getElementById(peerId);
    const tracks = myVid.srcObject.getVideoTracks();
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].stop();
    }
    myVid.srcObject = null;
    myVid.parentElement.remove()

    // emit video-turn-off event
    clientSocket.emit("myVideoTurnedOff", {
      vidId: getVidId(clientName),
      peerId
    });
    // show placeholder in video
    // show video icon in crossed state
    voiceButton.innerHTML = `<i class="fas fa-video-slash"></i>`;
  } else {
    // make the video on
    const myMediaStream = await getMyMediaStream()
    addVideo(myMediaStream, peerId, clientName.innerText)

    // emit event telling my video is turned on
    clientSocket.emit("myVideoTurnedOn", {
      vidId: getVidId(clientName),
      peerId,
    });

    voiceButton.innerHTML = `<i class="fas fa-video"></i>`;

    // toggle isVideoOn value
    isVideoOn = true;
  }
});
