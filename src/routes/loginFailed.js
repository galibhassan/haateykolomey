const express = require('express')
const path = require('path')
const router = express.Router()

router.get("/loginfailed", (req, res, next) => {
 // const pathToLoginFailedHTML = path.resolve(__dirname, '../', "view", "loginfailed.html");
  //res.sendFile(pathToLoginFailedHTML);
  res.render(loginFailed)
});

module.exports = router