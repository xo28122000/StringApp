const pool = require("../index");
let bandQueries = {};

//TODO figure out difference between filename/imgUrl, if any (and proper use)
bandQueries.createBand = (
  name,
  numMembers,
  imgUrl,
  location,
  locationLat,
  locationLong,
  genre,
  isLookingForMember,
  filename
) => {
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

bandQueries.searchBands = (
  name,
  genre,
  numMembers,
  location,
  locationLat,
  locationLong
) => {
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
    //if they provide a location (locationLat, locationLong found in band controller calling function)
    return new Promise((resolve, reject) => {
      pool.query(
        //change query below
        `Select *, POWER( SIN( ((37.762067-'${locationLat}')*0.01745329252)/2 ), 2) + COS( '${locationLat}' * 0.01745329252 ) * COS( 37.762067 * 0.01745329252 ) * POWER( SIN( ((-122.483492- '${locationLong}')*0.01745329252)/2 ), 2) AS temp from BAND order by (6371 * 2 * ATAN2( SQRT(temp), SQRT(1-temp) ))`,
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
