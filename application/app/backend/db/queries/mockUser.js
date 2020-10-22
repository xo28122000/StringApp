const pool = require("../index");
let mockQuerries = {};

mockQuerries.createBand = (name, type) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO MOCKUSER VALUES ${name} ${type}`,
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

mockQuerries.searchBand = (name, type) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO MOCKUSER VALUES ${name} ${type}`,
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
