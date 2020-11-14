const express = require("express");
const rateLimit = require("express-rate-limit");
const userController = require("../../controllers/userController/userController.js");

let userRouter = express.Router();

const createBandLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 15, // start blocking after 5 requests
  message: {
    success: false,
    error: "try again after an hour",
  },
});

const searchBandLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 100, // start blocking after 5 requests
  message: {
    success: false,
    error: "try again after an hour",
  },
});

const getAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 15, // start blocking after 5 requests
  message: {
    success: false,
    error: "try again after an hour",
  },
});

const searchEventsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 15, // start blocking after 5 requests
  message: {
    success: false,
    error: "try again after an hour",
  },
});

userRouter.post(
  "/createEvent",
  searchEventsLimiter,
  userController.createEvent
);

userRouter.post(
  "/searchEvents",
  searchEventsLimiter,
  userController.searchEvents
);

userRouter.post("/account", getAccountLimiter, userController.account);

userRouter.post("/getBands", searchEventsLimiter, userController.getBands);

userRouter.post("/getEvent", searchEventsLimiter, userController.getEvent);

module.exports = userRouter;
