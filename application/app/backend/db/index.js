const mysql = require("mysql");
const credentials = require("./credentials");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: credentials.database
});

pool.getConnection(async function(err, connection) {
  if (err) {
    console.log("MYSQL connection unsuccessful");
    return;
  } // not connected!
  console.log("MYSQL connection successful!");

  connection.query("CREATE DATABASE IF NOT EXISTS StringApp;");
  connection.query("USE StringApp;", function(error, result, fields) {});
  connection.query(
    "CREATE TABLE IF NOT EXISTS MOCKBAND(" +
      // name, type, numMembers, imgUrl
      "name varchar(30), " +
      "type varchar(30), " +
      "numMembers INT, " +
      "imgUrl varchar(100) );",
    function(error, result, fields) {}
  );
  // connection.query("DROP TABLE MOCKBAND;", function(error, result, fields) {});
  connection.release();
});

module.exports = pool;
