const path = require("path");

const express = require("express");
const router = express.Router();

const executeSQLQuery = require("../db/dbManager");

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login", async (req, res, next) => {
  const email = req.body.email;
  const inputPassword = req.body.password;
  // console.log(req.body);

  const dbResponse = await executeSQLQuery(`select * from users where email= '${email}'`).catch((err) => {
    console.log(err);
    res.send(err);
  });

  if (dbResponse.length === 1) {
    // console.log(dbResponse);
    const realPassword = dbResponse[0].password;
    if (realPassword === inputPassword) {
      // res.render("dashboard", { amarnam: dbResponse[0].firstname });
      res.render("dashboard", { 
        firstname: dbResponse[0].firstname,
        lastname: dbResponse[0].lastname,
        username: dbResponse[0].username
      });
    } else {
      res.render("loginfailed");
    }
  }
});

module.exports = router;
