const express = require("express");
const router = express.Router();
const executeSQLQuery = require("../db/dbManager");

router.get("/register", (req, res, next) => {
  res.render("register");
});

router.post("/register", (req, res, next) => {
  const { username, password, confirmPassword, firstname, lastname, userEmail } = req.body;

  if (password !== confirmPassword) {
    res.send("Password mismatch");
  } else {
    executeSQLQuery(`select * from users where email = '${userEmail}'`)
      .then((dbResponse) => {
        if (dbResponse.length !== 0) {
          // email already exists
          res.send("email already exists");
        } else {
          // no email address. So you can register
          const query = `
              insert into users (username, firstname, lastname, password, confirm_password, email)
              values ('${username.trim()}', '${firstname.trim()}', '${lastname.trim()}', '${password}', '${confirmPassword}', '${userEmail.trim()}') 
          `;
          executeSQLQuery(query)
            .then(() => {
              res.send("registration successful! please login!");
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
});

module.exports = router;
