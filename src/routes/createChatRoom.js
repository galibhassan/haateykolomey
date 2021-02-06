const { response } = require("express");
const express = require("express");
const router = express.Router();
const randomString = require("randomstring");
const executeSQLQuery = require("../db/dbManager");

const PASSWORD_LENGTH = 16;

router.post("/createChatRoom", async (req, res, next) => {
  const roomPassword = randomString.generate(PASSWORD_LENGTH);
  const { roomName } = req.body;
  roomNameSanitized = roomName.trim().replace(/ /g, "");

  /*   const debResponse =  executeSQLQawaituery(
    `insert into rooms (room_name, room_password)
     values('${roomNameSanitized}', '${roomPassword}')
    `
  )
  .catch(err => {
    console.log(err);
    res.send(err)
  })
  */

  const dbResponse = await executeSQLQuery(
    `select room_name from rooms
   where room_name = '${roomNameSanitized}'`
  ).catch((err) => {
    console.log(err);
    res.send(err);
  });

  console.log(dbResponse.length);
  if (dbResponse.length > 0) {
    // there exists a room with the proposed roomName
    res.send(`
      <h2> A room named ${roomNameSanitized} already exists.
      Please try with a different room-name. </h2>
    `);
  } else {
    const dbResponse2 = await executeSQLQuery(
      `insert into rooms (room_name, room_password)
       values('${roomNameSanitized}', '${roomPassword}')
      `
    ).catch((err) => {
      console.log(err);
      res.send(err);
    });

    res.redirect(`chatsession/${roomNameSanitized}`);
  }
});

module.exports = router;
