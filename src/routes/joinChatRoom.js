const path = require("path");
const express = require("express");
const router = express.Router();
const executeSQLQuery = require("../db/dbManager");

router.post("/joinChatRoom", async (req, res, next) => {
  const {roomName, roomPassword} = req.body;

  // check whether the room name and password are correct
  const dbResponse = await executeSQLQuery(
    `select room_name, room_password
     from rooms
     where room_name = '${roomName}' and room_password = '${roomPassword}'
     `
  ).catch(err=>{
    console.error(err)
    res.send(err)
  })

  if(dbResponse.length !== 1) {
    // error
    // no room exists, or room-password mismatch
    res.send('No room exists with this name to join. Or room-password mismatch.')
  } else {
  
    res.redirect(`chatsession/${roomName}/?roomPassword=${roomPassword}`);
  }

});

module.exports = router;
