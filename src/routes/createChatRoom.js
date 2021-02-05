const express = require("express");
const router = express.Router();
const randomString = require("randomstring");

const PASSWORD_LENGTH = 16;

router.post("/createChatRoom", (req, res, next) => {
  const serversideIO = req.app.get("socketio");
  const roomPassword = randomString.generate(PASSWORD_LENGTH);
  const { roomName } = req.body;
  roomNameSanitized = roomName.trim().replace(/ /g, "");
//  roomNameSanitized = roomNameSanitized;

  serversideIO.on("connection", (clientSocket) => {

    // clientSocket.join(roomNameSanitized);
    // console.log(serversideIO.sockets.adapter.rooms)

    
  });

  // res.redirect(`chatsession/${roomNameSanitized}/${roomPassword}`);
  res.redirect(`chatsession/${roomNameSanitized}`);
});

module.exports = router;
