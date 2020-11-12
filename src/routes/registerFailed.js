const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/registerfailed", (req, res, next) => {
  const currentPath = path.resolve(__dirname, '../', "view", "registerfailed.html");
  res.sendFile(currentPath);
});

module.exports = router;
