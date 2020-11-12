const express = require("express");
const path = require("path");
const router = express.Router();

router.post("/createChatRoom", (req, res, next) => {
    console.log(req.body)
    res.render('chat')

});

module.exports = router;


