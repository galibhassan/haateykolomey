const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/chatSession/:roomName", (req, res, next) => {
  const { roomName } = req.params;
  const {roomPassword} = req.query

  res.render("chat", {
    roomName,
    roomPassword
  });
});

module.exports = router;
