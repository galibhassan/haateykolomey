const peer = new Peer(undefined, {
  host: "/",
  port: "8001",
});

peer.on("open", (id) => {
  console.log("peer id: " + id);
  // addVideo(constraints)
  clientSocket.emit("userJoined", {
    roomName: roomName.innerText,
    userId: id,
  });
});
