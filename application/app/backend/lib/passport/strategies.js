const LocalStrategy = require("passport-local").Strategy;
const stringAccountQueries = require("../../db/queries/stringAccount");
module.exports = {
  "user-login": new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      stringAccountQueries
        .login(email, password)
        .then(data => {
          if (data && data.length === 1) {
            delete data.password;
            return done(null, {
              ...data[0],
              location: JSON.parse(data[0].location)
            });
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
      stringAccountQueries
        .register(
          email,
          password,
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
