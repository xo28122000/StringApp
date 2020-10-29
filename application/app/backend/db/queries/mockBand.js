const pool = require("../index");
let mockQuerries = {};

mockQuerries.createBand = (name, type, numMembers, imgUrl) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO MOCKBAND VALUES('${name}', '${type}', ${numMembers}, '${imgUrl}')`,
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

mockQuerries.searchBand = (name, type, numMembers) => {
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

module.exports = mockQuerries;
