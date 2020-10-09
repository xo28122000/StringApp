const pool = require("../index");
let userQuerries = {};

userQuerries.exampleQuery = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users", (err, results) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(results);
      }
    });
  });
};

module.exports = userQuerries;
