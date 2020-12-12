const LocalStrategy = require("passport-local").Strategy;
const stringAccountQueries = require("../../db/queries/stringAccount");

const bcrypt = require("bcryptjs");

module.exports = {
  "user-login": new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      stringAccountQueries
        .getUser(email)
        .then(data => {
          if (data && data.length === 1) {
            if (!bcrypt.compareSync(password, data[0].password)) {
              // incorrect pass
              console.log("incorrect pass");
              return done(null, false, { message: "Incorrect password" });
            } else {
              delete data[0].password;
              return done(null, {
                ...data[0],
                location: JSON.parse(data[0].location)
              });
            }
          } else {
            return done(null, false, { message: "Incorrect field" });
          }
        })
        .catch(err => {
          return done(err.sqlMessage);
        });
    }
  ),
  "user-register": new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      const hashedPassword = bcrypt.hashSync(password, 12);
      stringAccountQueries
        .register(
          email,
          hashedPassword,
          req.body.name,
          req.body.imgUrl,
          req.body.phoneNumber,
          JSON.stringify(req.body.location),
          req.body.locationLat,
          req.body.locationLong,
          req.body.role,
          req.body.genre
        )
        .then(data => {
          if (data.affectedRows !== 1) {
            return done(null, false, {
              message: "unable to create user"
            });
          }
          delete req.body.password;
          return done(null, req.body);
        })
        .catch(err => {
          return done(err.sqlMessage);
        });
    }
  )
};
