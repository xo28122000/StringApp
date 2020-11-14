const pool = require("../index");
let bandQueries = {};

bandQueries.createBand = (name, type, numMembers, imgUrl) => {
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

bandQueries.searchBands = (name, type, numMembers) => {
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

bandQueries.createEvent = (
  title,
  description,
  date,
  startTime,
  endTime,
  location,
  bandId
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO EVENTS (title, description, date, startTime, endTime, location, bandId) VALUES('${title}', '${description}', '${date}', '${startTime}', '${endTime}', '${location}', '${bandId}')`,
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

bandQueries.getBandInfo = (bandId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `Select * from BAND where bandId like '${bandId}'`,
      [bandId],
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

module.exports = bandQueries;
