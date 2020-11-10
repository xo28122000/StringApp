const pool = require("../index");
let mainQueries = {};

main.searchEvents = (title, date, location) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `Select * from MOCKBAND where name like '${name}' and type like '${type}' and numMembers >= ${numMembers}`,
      (err, results) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(results);
        }
      }
    );
  });
};


module.exports = mainQueries;
