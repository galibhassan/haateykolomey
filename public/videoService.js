let VID_ID = null;
let isShowingVidForFirstTime = true;

const voiceButton = document.getElementById("voiceButton");

const addVideo = (constraints, vidId) => {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      let myVid;
      if (vidId === null) {
        vidId = getVidId(clientName);
        VID_ID = vidId;
      }
      if (isShowingVidForFirstTime) {
        myVid = document.createElement("video");
        myVid.setAttribute("id", vidId);
      } else {
        myVid = document.getElementById(vidId);
      }

      addVideoStream(myVid, stream, videobox);

      peer.on("call", (call) => {
        call.answer(stream);
        call.on("stream", (otheruservideoStream) => {
          setTimeout(
            addVideoStream,
            200,
            document.createElement("video"),
            otheruservideoStream,
            videobox
          );
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

function addVideoStream(myVid, stream, videobox) {
  if (isShowingVidForFirstTime) {
    const vidContainer = document.createElement("div");
    const whoseVid = document.createElement("div");
    whoseVid.innerHTML = clientName.innerText;

    vidContainer.appendChild(myVid);
    vidContainer.appendChild(whoseVid);
    // styling
    myVid.classList.add("video-element");
    vidContainer.classList.add("video-container");
    whoseVid.classList.add("video-broadcaster-name");
    videobox.append(vidContainer);
    isShowingVidForFirstTime = false;
  }

  myVid.muted = true;
  myVid.srcObject = stream;

  myVid.addEventListener("loadedmetadata", () => {
    myVid.play();
  });
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

const constraints = { audio: false, video: { width: 100, height: 70 } };
const videobox = document.querySelector(".videobox");

let isVideoOn = false;

const getVidId = (clientName) => {
  return `vid_${clientName.innerText.replace(" ", "_")}`;
};

clientSocket.on("videoTurnedOn", (ro) => {
  const { vidId } = ro;
  addVideo(constraints, vidId);
});

clientSocket.on("videoTurnedOff", (ro) => {
  const { vidId } = ro;
  let jeiVideoTaTurnOffKorteHobey = document.getElementById(vidId);
  const tracks = jeiVideoTaTurnOffKorteHobey.srcObject.getVideoTracks();
  for (let i = 0; i < tracks.length; i++) {
    tracks[i].stop();
  }
  // jeiVideoTaTurnOffKorteHobey.srcObject = null;
});

voiceButton.innerHTML = `<i class="fas fa-video-slash"></i>`;
voiceButton.addEventListener("click", (e) => {
  if (isVideoOn) {
    // toggle isVideoOn value
    isVideoOn = false;
    // emit video-turn-off event
    clientSocket.emit("videoTurnedOff", {
      vidId: getVidId(clientName),
    });
    // show placeholder in video
    // show video icon in crossed state
    voiceButton.innerHTML = `<i class="fas fa-video-slash"></i>`;
  } else {
    // make the video on
    clientSocket.emit("videoTurnedOn", {
      vidId: getVidId(clientName),
    });

    voiceButton.innerHTML = `<i class="fas fa-video"></i>`;

    // toggle isVideoOn value
    isVideoOn = true;
  }
});
