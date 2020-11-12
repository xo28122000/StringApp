const pool = require("../index");
let userQueries = {};

userQueries.createBand = (name, type, numMembers, imgUrl) => {
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

userQueries.searchBands = (name, type, numMembers) => {
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

//

userQueries.searchEvents = (title, date, location) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `Select * from EVENTS where title like '${title}' OR date <= '${date}' OR location like '${location}'`,
      (err, results) => {
        if (err) {
          console.log(err);
          return reject(err);
        } else {
          return resolve(results);
        }
      }
    );
  });
};

//TODO fix this SQL query
userQueries.account = (name, type, numMembers, imgUrl) => {
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

//TODO fix this SQL query:
//need to join the query - userId -> band member, bandId from band member, then bands from bands with bandID
userQueries.getBands = (userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select from Band where userId = '${userId}'`,
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

module.exports = userQueries;
