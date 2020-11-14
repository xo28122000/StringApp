const pool = require("../index");
let bandQueries = {};

//TODO figure out difference between filename/imgUrl, if any (and proper use)
bandQueries.createBand = (
  name,
  numMembers,
  imgUrl,
  location,
  genre,
  isLookingForMember,
  filename
) => {
  //TODO run middleware code to find location here
  var locationLat = 3.14;
  var locationLong = 3.14;

  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO BAND (name, numMembers, logoImageUrl, location, locationLat, locationLong, genre, isLookingForMember) VALUES('${name}', '${numMembers}', '${imgUrl}', '${location}', '${locationLat}', '${locationLong}', '${genre}', '${isLookingForMember}')`,
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

//TODO fix this SQL query:
//need to join the query - userId -> band member, bandId from band member, then bands from bands with bandID
bandQueries.getBands = (userId) => {
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

bandQueries.searchBands = (name, genre, numMembers, location) => {
  if (location < 0) {
    return new Promise((resolve, reject) => {
      pool.query(
        `Select * from BAND where name like '${name}' or type like '${genre}' or numMembers >= ${numMembers}`,
        (err, results) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(results);
          }
        }
      );
    });
  } else {
    //middleware for location search goes here
    var locationLat = 3.14;
    var locationLong = 3.14;
    return new Promise((resolve, reject) => {
      pool.query(
        `Select * from BAND where name like '${name}' or type like '${genre}' or numMembers >= ${numMembers} and (locationLat like '${locationLat}' and locationLong like '${locationLong}')`,
        (err, results) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(results);
          }
        }
      );
    });
  }
};

//

bandQueries.searchEvents = (title, date, location) => {
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

bandQueries.getBandInfo = (bandId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `Select bandId, name, logoImageUrl, location, locationLat, locationLong, genre, isLookingForMember from BAND where bandId = ?`,
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
