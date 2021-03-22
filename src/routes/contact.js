const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/contact", (req, res, next) => {
  res.render('contact')

});

module.exports = router;
