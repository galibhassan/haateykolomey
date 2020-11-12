const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/register", (req, res, next) => {
  //const currentPath = path.resolve(__dirname, '../', "view", "register.html");
  //res.sendFile(currentPath);
 res.render('register')
});

router.post("/register", (req, res, next) => {
  const { username, password, confirmPassword, firstname, lastname, userEmail } = req.body;

  if (password !== confirmPassword) {
    res.send("Password mismatch");
  } else {
    amaderDb.all(`select * from users where email = '${userEmail}'`, (err, dbResponse) => {
      if (dbResponse.length !== 0) {
        // email already exists
        res.send("email already exists");
      } else {
        // no email address. So you can register
        const query = `
              insert into users (username, firstname, lastname, password, confirm_password, email)
              values ('${username.trim()}', '${firstname.trim()}', '${lastname.trim()}', '${password}', '${confirmPassword}', '${userEmail.trim()}') 
          `;
        amaderDb.run(query, (err) => {
          if (err) {
            res.send(err);
          } else {
            res.send("registration success! please login!");
          }
        });
      }
    });
  }
});

module.exports = router;
