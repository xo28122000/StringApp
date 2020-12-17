const pool = require("../index");
let userQueries = {};

//this query is deprecated and not being used right now in routing
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

//query to update a name in user info in stringaccount table
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

//query to update a phone number in user info in stringaccount table
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

//query to update role in a user's information in stringaccount table
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

//query to create a new link in links field of stringaccount table
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

//query to retrieve a specific event from the invitations table
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

//query to retrieve all links in a user account
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

//query to retrieve all bands a user is a part of
userQueries.getUserBand = (userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT B.*
      FROM StringApp.BANDMEMBERS BM, StringApp.BAND B
      WHERE BM.userId = ? AND BM.bandId = B.bandId;`,
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

//query that edits the user info in the stringaccount table by userId
userQueries.editUserInfo = (userId, name, role) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE  StringApp.STRINGACCOUNT SA
      SET SA.name = ?, SA.role = ?
      WHERE SA.userId = ? ;`,
      [name, role, userId],
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

//query that edits the user info in the stringaccount table by userId
userQueries.editUserInfoPassword = (userId, name, password, role) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE  StringApp.STRINGACCOUNT SA
      SET SA.name = ?, SA.password = ?, SA.role = ?
      WHERE SA.userId = ? ;`,
      [name, password, role, userId],
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

//query to create a new invite in invitations table
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
