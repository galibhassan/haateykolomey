const express = require("express");
const router = express.Router();
const randomString = require("randomstring");

const PASSWORD_LENGTH = 16;

router.post("/createChatRoom", (req, res, next) => {
  const roomPassword = randomString.generate(PASSWORD_LENGTH);
  const { roomName } = req.body;
  const serversideIO = req.app.get('socketio');

  console.log(serversideIO)

  console.log("create chat room route reached");
  
  res.render("chat", {
    roomName,
    roomPassword,
  });
});

module.exports = router;