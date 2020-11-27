const pool = require("../index");
let bandQueries = {};

//TODO figure out difference between filename/imgUrl, if any (and proper use)
bandQueries.createBand = (
  name,
  imgUrl,
  location,
  locationLat,
  locationLong,
  genre,
  isLookingForMember,
  userId
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO BAND (name, logoImageUrl, location, locationLat, locationLong, genre, isLookingForMember) VALUES('${name}', '${imgUrl}', '${location}', '${locationLat}', '${locationLong}', '${genre}', '${isLookingForMember}')`,
      `INSERT INTO BANDMEMBERS (isBandAdmin, role, datejoined, userId, bandId) VALUES ('1', 'not specified', GETDATE(), '${userId}','LAST_INSERT_ID()')`,
      (err, results) => {
        if (err) {
          return reject(err);
        } else {
          //console.log("no errors");
          return resolve(results);
        }
      }
    );
    //`INSERT INTO BANDMEMBERS (isBandAdmin, bandId) VALUES (1, LAST_INSERT_ID())`,
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

bandQueries.createMember = (isBandAdmin, role, dateJoined, userId, bandId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO BANDMEMBERS (isBandAdmin, role, dateJoined, userId, bandId) VALUES('${isBandAdmin}', '${role}', '${dateJoined}', '${userId}', '${bandId}')`,
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
      `select from BAND where userId = '${userId}'`,
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

bandQueries.getBandMembers = (bandId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * from BANDMEMBERS where (bandId = '${bandId}')`,
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
  locationLat,
  locationLong,
  isLookingForMember
) => {
  if (!locationLat || !locationLong) {
    //no location provided
    return new Promise((resolve, reject) => {
      //console.log("reached no location search query");
      pool.query(
        `SELECT * from BAND WHERE (name LIKE '${name}' AND genre LIKE '${genre}'AND isLookingForMember >= ${isLookingForMember})`,
        (err, results) => {
          if (err) {
            return reject(err);
          } else {
            //console.log("no errors");
            //console.log(results);
            return resolve(results);
          }
        }
      );
    });
  } else {
    //if they provide a location (locationLat, locationLong found in band controller calling function)
    return new Promise((resolve, reject) => {
      pool.query(
        //query searches by location only(?)
        // `Select name, location, POWER( SIN( ((37.762067-${locationLat})*0.01745329252)/2 ), 2) + COS( ${locationLat} * 0.01745329252 ) * COS( 37.762067 * 0.01745329252 ) * POWER( SIN( ((-122.483492- '${locationLong}')*0.01745329252)/2 ), 2) AS temp from BAND order by (6371 * 2 * ATAN2( SQRT(temp), SQRT(1-temp) ))`,
        `select *, POWER( SIN( ((locationLat-${locationLat})*0.01745329252)/2 ), 2) + COS( ${locationLat} * 0.01745329252 ) * COS( locationLat * 0.01745329252 ) * POWER( SIN( ((locationLong-${locationLong})*0.01745329252)/2 ), 2) AS temp from BAND WHERE (name LIKE '${name}' AND genre LIKE '${genre}'AND isLookingForMember >= ${isLookingForMember}) order by (6371 * 2 * ATAN2( SQRT(temp), SQRT(1-temp) ));`,
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

bandQueries.searchEvents = (title, date, location) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `Select * from EVENTS where title like '${title}' OR date <= '${date}' OR location like '${location}'`,
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
