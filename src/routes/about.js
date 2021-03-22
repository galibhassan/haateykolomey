const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/about", (req, res, next) => {
  res.render('about')

});

module.exports = router;
