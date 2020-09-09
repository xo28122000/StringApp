const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "csc648-db.cscogdnip4k5.us-west-1.rds.amazonaws.com",
  user: "admin",
  password: "CSC-648(T5)",
  database: "M0"
});

pool.getConnection(async function(err, connection) {
  if (err) throw err; // not connected!

  console.log("MYSQL connection successful!");
  connection.query("CREATE DATABASE IF NOT EXISTS M0;");
  connection.query("USE M0;", function(error, result, fields) {});
  connection.query(
    "CREATE TABLE IF NOT EXISTS users(" +
      "name varchar(30), " +
      "email varchar(255), " +
      "description varchar(400) );",
    function(error, result, fields) {}
  );
  connection.release();
});

let M0_db = {};

M0_db.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users", (err, results) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(results);
      }
    });
  });
};

M0_db.addUser = (name, email, description) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO M0.users (name, email, description) values(?,?,?)",
      [name, email, description],
      (err, results) => {
        if (err) {
          return reject(err);
        } else {
          return resolve("user added");
        }
      }
    );
  });
};

module.exports = M0_db;
