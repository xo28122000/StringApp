const express = require("express");
const passport = require("passport");
const rateLimit = require("express-rate-limit");

const createStringAccountLimmiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 150, // start blocking after 5 requests
  message: {
    success: false,
    error: "try again after an hour",
  },
});

let authRouter = express.Router();

authRouter.post(
  "/register",
  createStringAccountLimmiter,
  (req, res, next) => {
    // get geocoordinates
    next();
  },
  function (req, res, next) {
    passport.authenticate("user-register", function (error, user, info) {
      if (error) {
        return res.send({ success: false });
      }
      if (!user) {
        return res.send({ success: false });
      }
      req.logIn(user, (error) => {
        if (error) {
          return res.send({ success: false });
        }
        return res.send({ success: true, user });
      });
    })(req, res, next);
  }
);

authRouter.post("/login", function (req, res, next) {
  passport.authenticate("user-login", function (error, user, info) {
    if (error) {
      return res.send({ success: false });
    } else if (!user) {
      return res.send({ success: false });
    }
    req.logIn(user, (error) => {
      if (error) {
        return res.send({ success: false });
      }
      return res.send({ success: true, user });
    });
  })(req, res, next);
});

authRouter.post("/logout", (req, res) => {
  req.logout();
  res.send({ success: true });
});

authRouter.post("/user", (req, res) => {
  if (req.user) {
    res.send({ success: true, user: req.user });
  } else {
    res.send({ success: false });
  }
});

module.exports = authRouter;
