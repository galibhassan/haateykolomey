const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/chatSession/:roomName", (req, res, next) => {
  const { roomName } = req.params;
  const serversideIO = req.app.get("socketio");

  res.render("chat", {
    roomName,
    roomPassword: 'amader password',
    publicFolder: path.resolve(__dirname, "../", "../", "public"),
  });
});

module.exports = router;
