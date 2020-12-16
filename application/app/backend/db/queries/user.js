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

userQueries.createLink = async (userId, links) => {
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
      `SELECT * FROM EVENTS where eventId = '${eventId}'`,
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
      `SELECT links FROM STRINGACCOUNT where userId = ?`,
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

userQueries.getUserBand = (userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT BM.bandId, BM.bandMemberId, BM.role, BM.isBandAdmin, BM.dateJoined, BM.userId, SA.email, SA.name, SA.profileImageUrl
      FROM StringApp.BANDMEMBERS BM, StringApp.BAND B, StringApp.STRINGACCOUNT SA
      WHERE BM.bandId = B.bandId AND SA.userId = '${userId}' AND BM.userId = SA.userId;`,
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

userQueries.editUserInfo = (userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE  StringApp.STRINGACCOUNT SA
      SET SA.name = '${name}', SA.email = '${email}', SA.password = '${password}', SA.profileImageUrl = '${profileImageUrl}', SA.phoneNumber = '${phoneNumber}', SA.location = '${location}', SA.role = '${role}', SA.genre = '${genre}'
      WHERE SA.userId = '${userId}' ;`,
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

userQueries.sendInvite = (message, today, sentByBand, userId, bandId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO INVITATIONS (message, dateSent, sentByBand, userId, bandId) VALUES (?, ?, ?, ?, ?)`,
      [message, today, sentByBand, userId, bandId],
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
