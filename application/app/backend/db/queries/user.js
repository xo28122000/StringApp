const pool = require("../index");
let userQueries = {};

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

userQueries.changeName = (userId, newName) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE STRINGACCOUNT SET name = '${newName}' WHERE userId = '${userId}'`,
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

userQueries.changePhone = (userId, newPhoneNum) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE STRINGACCOUNT SET phoneNumber = '${newPhoneNum}' WHERE userId = '${userId}'`,
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

userQueries.changeRole = (userId, newRole) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE STRINGACCOUNT SET role = '${newRole}' WHERE userId = '${userId}'`,
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

userQueries.createLink = (userId, links) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE STRINGACCOUNT SET links = ? WHERE userId = ?`,
      [links, userId],
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

userQueries.getEvent = (eventId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM EVENTS where eventId like '${eventId}'`,
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

userQueries.getLink = async (userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT links FROM STRINGACCOUNT where userId like ?`,
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

module.exports = userQueries;
