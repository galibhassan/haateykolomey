const path = require('path')
const express = require("express");
const router = express.Router();

router.get("/chatSession/:roomName/:roomPassword", (req, res, next) => {
  const {roomName, roomPassword} = req.params

  res.render("chat", {
    roomName,
    roomPassword,
    publicFolder: path.resolve(__dirname, '../', '../', 'public')
  });  
});

module.exports = router;
