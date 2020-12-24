const express = require("express");
const path = require("path");
const router = express.Router();
const randomString = require("randomstring");
const serversideIO = require('../server')



const PASSWORD_LENGTH = 16;
/*const rooms = {name: {}}
const users = {}
router.get('/', (req, res)=>{
  res.render('dashboard', {rooms: rooms})
})

router.get('/:roomName', (req, res)=>{
 
res.render('createChatRoom', {roomName: req.params.room})
})*/
router.post("/createChatRoom", (req, res, next) => {
  const roomPassword = randomString.generate(PASSWORD_LENGTH);
  const { roomName } = req.body;

 /* if(rooms[req.body.roomName] != null){
    return res.redirect('/')
  }
  
  rooms[req.body.roomName] = {users: {}}
  res.redirect(req.body.roomName)*/

 
  console.log(serversideIO)

  res.render("chat", {
    roomName,
    roomPassword,
  });
});


module.exports = router;
