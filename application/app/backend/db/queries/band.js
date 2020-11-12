const pool = require("../index");
let bandQueries = {};

//TODO fix this SQL query:
//(node:14588) UnhandledPromiseRejectionWarning:
//Error: ER_BAD_FIELD_ERROR: Unknown column 'undefined' in 'field list'
//something wrong with the Promise, or pool.query
/**
 * (node:14588) UnhandledPromiseRejectionWarning: Unhandled promise rejection.
 * This error originated either by throwing inside of an async function
 * without a catch block, or by rejecting a promise which was not handled
 * with .catch(). To terminate the node process on unhandled promise rejection,
 * use the CLI flag `--unhandled-rejections=strict`
 * (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
 * (node:14588) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated.
 * In the future, promise rejections that are not handled will terminate
 * the Node.js process with a non-zero exit code.
 * */
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
      `INSERT INTO EVENTS (title, description, date, startTime, endTime, location, bandId) VALUES('${title}', '${description}', ${date}, '${startTime}', '${endTime}', '${location}', '${bandId}')`,
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
