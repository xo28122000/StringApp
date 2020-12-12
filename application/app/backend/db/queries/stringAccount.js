const pool = require("../index");
let stringAccountQueries = {};

stringAccountQueries.register = (
  email,
  passwordHash,
  name,
  profileImageUrl,
  phoneNumber,
  location,
  locationLat,
  locationLong,
  role,
  genre
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO STRINGACCOUNT VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
      [
        email,
        passwordHash,
        name,
        profileImageUrl,
        phoneNumber,
        location,
        locationLat,
        locationLong,
        role,
        genre,
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

stringAccountQueries.login = (email, passwordHash) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `Select userId, email, name, profileImageUrl, phoneNumber, location, locationLat, locationLong, role, genre from STRINGACCOUNT where email like ? and password like ?`,
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

stringAccountQueries.getUserFromId = (userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `Select userId, email, name, profileImageUrl, phoneNumber, location, locationLat, locationLong, role, genre from STRINGACCOUNT where userId = ?`,
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
