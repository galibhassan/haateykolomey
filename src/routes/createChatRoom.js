const express = require("express");
const path = require("path");
const router = express.Router();
const randomString = require("randomstring");

const PASSWORD_LENGTH = 16;

router.post("/createChatRoom", (req, res, next) => {
  const roomPassword = randomString.generate(PASSWORD_LENGTH);
  const { roomName } = req.body;

  const modifiedRoomName = roomName.trim().replace(/ /g, "_").toLowerCase();

  console.log(req.body, roomPassword);

  res.render("chat", {
    roomName,
    modifiedRoomName,
    roomPassword,
  });
});

module.exports = router;
