const express = require('express')
const path = require('path')
const router = express.Router()

router.get("/logout", (req, res, next) => {
 // const pathToLoginFailedHTML = path.resolve(__dirname, '../', "view", "loginfailed.html");
  //res.sendFile(pathToLoginFailedHTML);
  res.render('logout')
});

module.exports = router