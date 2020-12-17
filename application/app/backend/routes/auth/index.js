const express = require("express");
const passport = require("passport");
const rateLimit = require("express-rate-limit");
const isUser = require("../../helpers/middlewares/isUser");

//sets a limit on how often an account can be created
const createStringAccountLimmiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 150, // start blocking after 5 requests
  message: {
    success: false,
    error: "try again after an hour",
  },
});

let authRouter = express.Router();

//route definition for registering a user account
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
        //console.log(error)
        return res.send({ success: false });
      }
      if (!user) {
        return res.send({ success: false });
      }
      req.logIn(user, (error) => {
        if (error) {
          //console.log(error);
          return res.send({ success: false });
        }
        return res.send({
          success: true,
          user: {
            ...user,
            links: JSON.parse(user.links),
          },
        });
      });
    })(req, res, next);
  }
);

//route definition for logging in to a user account
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
      return res.send({
        success: true,
        user: {
          ...user,
          links: JSON.parse(user.links),
        },
      });
    });
  })(req, res, next);
});

//route definition for logging out of a user account
authRouter.post("/logout", (req, res) => {
  req.logout();
  res.send({ success: true });
});

//route definition for displaying a user's account information
authRouter.post("/user", (req, res) => {
  if (req.user) {
    res.send({
      success: true,
      user: {
        ...req.user,
        links: JSON.parse(req.user.links),
      },
    });
  } else {
    res.send({ success: false });
  }
});

module.exports = authRouter;
