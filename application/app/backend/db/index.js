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

  //   connection.query("CREATE DATABASE IF NOT EXISTS M0;");
  //   connection.query("USE M0;", function(error, result, fields) {});
  //   connection.query(
  //     "CREATE TABLE IF NOT EXISTS users(" +
  //       "name varchar(30), " +
  //       "email varchar(255), " +
  //       "description varchar(400) );",
  //     function(error, result, fields) {}
  //   );
  connection.release();
});

module.exports = pool;
