const pool = require("../index");
let stringAccountQueries = {};

stringAccountQueries.register = (
  email,
  passwordHash,
  name,
  profileImageUrl,
  phoneNumber,
  links,
  location,
  locationLat,
  locationLong,
  role,
  genre
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO STRINGACCOUNT VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
      [
        email,
        passwordHash,
        name,
        profileImageUrl,
        phoneNumber,
        JSON.stringify([]),
        location,
        locationLat,
        locationLong,
        role,
        genre
      ],
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

stringAccountQueries.getUser = (email, passwordHash) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `Select userId, email, password, name, profileImageUrl, phoneNumber, links, location, locationLat, locationLong, role, genre from STRINGACCOUNT where email like ?`,
      [email, passwordHash],
      (err, results) => {
        if (err) {
          //console.log(err);
          return reject(err);
        } else {
          return resolve(results);
        }
      }
    );
  });
};

stringAccountQueries.getUserFromId = userId => {
  return new Promise((resolve, reject) => {
    pool.query(
      `Select userId, email, name, profileImageUrl, phoneNumber, links, location, locationLat, locationLong, role, genre from STRINGACCOUNT where userId = ?`,
      [userId],
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

module.exports = stringAccountQueries;
