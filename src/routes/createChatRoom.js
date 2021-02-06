const express = require("express");
const router = express.Router();
const randomString = require("randomstring");

const PASSWORD_LENGTH = 16;

router.post("/createChatRoom", (req, res, next) => {
  const serversideIO = req.app.get("socketio");
  const roomPassword = randomString.generate(PASSWORD_LENGTH);
  const { roomName } = req.body;
  roomNameSanitized = roomName.trim().replace(/ /g, "");


  res.redirect(`chatsession/${roomNameSanitized}`);
});

module.exports = router;
