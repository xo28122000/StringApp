const passport = require("passport");
const strategies = require("./strategies");
const stringAccountQueries = require("../../db/queries/stringAccount");

passport.use("user-login", strategies["user-login"]);
passport.use("user-register", strategies["user-register"]);

passport.serializeUser(function(user, done) {
  // console.log("serializeUser");
  done(null, { userId: user.userId });
});

passport.deserializeUser(function(obj, done) {
  // console.log("deserializeUser");
  stringAccountQueries
    .getUserFromId(obj.userId)
    .then(data => {
      if (data && data.length === 1) {
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
});

module.exports = passport;
