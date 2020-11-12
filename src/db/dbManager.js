const path = require("path");
const sqlite = require("sqlite3");

const amaderDb = new sqlite.Database(path.resolve(__dirname, "loginSystem.db"));

const executeSQLQuery = (query) => {
  return new Promise((resolve, reject) => {
    amaderDb.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = executeSQLQuery;
