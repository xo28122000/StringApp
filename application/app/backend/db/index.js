//const mysql = require("mysql");
//const credentials = require("./credentials");

const mysql = require("mysql");
const credentials = require("./credentials.js");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: credentials.database,
});

pool.getConnection(async function (err, connection) {
  if (err) {
    console.log("MYSQL connection unsuccessful");
    console.log(err);

    return;
  } // not connected!
  console.log("MYSQL connection successful!");

  //below line won't work since the createPool call at line 7 needs the database to exist already
  connection.query("CREATE DATABASE IF NOT EXISTS StringApp;");
  connection.query("USE StringApp;", function (error, result, fields) {});
  /** 
  connection.query( 
    "CREATE TABLE IF NOT EXISTS MOCKBAND(" +
      "name varchar(30), " +
      "type varchar(30), " +
      "numMembers INT, " +
      "imgUrl varchar(100) );",
    function (error, result, fields) {}
  );
  */

  connection.query(
    "CREATE TABLE IF NOT EXISTS STRINGACCOUNT(" +
      "userId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
      "email varchar(350) NOT NULL UNIQUE, " +
      "password varchar(200) NOT NULL, " +
      "name varchar(100) NOT NULL, " +
      "profileImageUrl varchar(150), " +
      "phoneNumber varchar(15), " +
      "links varchar(500), " +
      "location varchar(500), " +
      "locationLat decimal(30,15), " +
      "locationLong decimal(30,15), " +
      "role varchar(50), " +
      "genre varchar(50)" +
      " );",
    function (error, result, fields) {
      //console.log(error);
    }
  );

  connection.query(
    "CREATE TABLE IF NOT EXISTS BAND(" +
      "bandId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
      "name varchar(100) NOT NULL UNIQUE, " +
      "numMembers INT DEFAULT 1, " +
      "logoImageUrl varchar(500), " +
      "links varchar(500), " +
      "description varchar(500), " +
      "location varchar(500), " +
      "locationLat decimal(30,15), " +
      "locationLong decimal(30,15), " +
      "genre varchar(100), " +
      "isLookingForMember BOOLEAN" +
      " );",
    function (error, result, fields) {}
  );

  connection.query(
    "CREATE TABLE IF NOT EXISTS BANDMEMBERS(" +
      "bandMemberId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
      "isBandAdmin BOOLEAN, " +
      "role varchar(45), " +
      "dateJoined DATE, " +
      "userId INT, " +
      "bandId INT, " +
      "FOREIGN KEY (userId) REFERENCES stringaccount(userId) ON UPDATE CASCADE ON DELETE CASCADE, " +
      "FOREIGN KEY (bandId) REFERENCES band(bandId) ON UPDATE CASCADE ON DELETE CASCADE" +
      " );",
    function (error, result, fields) {}
  );

  connection.query(
    "CREATE TABLE IF NOT EXISTS INVITATIONS(" +
      "inviteId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
      "message varchar(250), " +
      "dateSent DATE, " +
      "sentByBand BOOLEAN, " +
      "userId INT, " +
      "bandId INT, " +
      "FOREIGN KEY (userId) REFERENCES stringaccount(userId) ON UPDATE CASCADE ON DELETE CASCADE, " +
      "FOREIGN KEY (bandId) REFERENCES band(bandId) ON UPDATE CASCADE ON DELETE CASCADE" +
      " );",
    function (error, result, fields) {}
  );

  connection.query(
    "CREATE TABLE IF NOT EXISTS BANDPOSTS(" +
      "bandPostId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
      "media varchar(400), " +
      "title varchar(45), " +
      "description varchar(400), " +
      "bandId INT, " +
      "FOREIGN KEY (bandId) REFERENCES band(bandId) ON UPDATE CASCADE ON DELETE CASCADE" +
      " );",
    function (error, result, fields) {}
  );

  connection.query(
    "CREATE TABLE IF NOT EXISTS REPERTOIRE(" +
      "repId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
      "songName varchar(45), " +
      "runTime varchar(45), " +
      "genre varchar(45), " +
      "link varchar(150), " +
      "bandId INT, " +
      "FOREIGN KEY (bandId) REFERENCES band(bandId) ON UPDATE CASCADE ON DELETE CASCADE" +
      " );",
    function (error, result, fields) {}
  );

  connection.query(
    "CREATE TABLE IF NOT EXISTS EVENTS(" +
      "eventId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
      "title varchar(45), " +
      "description varchar(400), " +
      "date DATE, " +
      "startTime TIME, " +
      "endTime TIME, " +
      "location varchar(500), " +
      "locationLat decimal(30,15), " +
      "locationLong decimal(30,15), " +
      "bandId INT, " +
      "FOREIGN KEY (bandId) REFERENCES band(bandId) ON UPDATE CASCADE ON DELETE CASCADE" +
      " );",
    function (error, result, fields) {}
  );

  connection.query(
    "CREATE TABLE IF NOT EXISTS SETS(" +
      "setId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
      "songName varchar(45), " +
      "runTime varchar(45), " +
      "eventId INT, " +
      "FOREIGN KEY (eventId) REFERENCES EVENTS(eventId) ON UPDATE CASCADE ON DELETE CASCADE" +
      " );",
    function (error, result, fields) {}
  );

  connection.query(
    "CREATE TABLE IF NOT EXISTS administratorStringAccount(" +
      "adminUserId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
      "email varchar(45), " +
      "password varchar(45), " +
      "name varchar(45), " +
      "role varchar(45)" +
      " );",
    function (error, result, fields) {}
  );
  // connection.query("DROP TABLE MOCKBAND;", function(error, result, fields) {});
  connection.release();
});

module.exports = pool;
