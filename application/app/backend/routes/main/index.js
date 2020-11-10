const express = require("express");

const rateLimit = require("express-rate-limit");

const searchEventsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 15, // start blocking after 5 requests
  message: {
    success: false,
    error: "try again after an hour",
  },
});

const searchMockBandLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 100, // start blocking after 5 requests
  message: {
    success: false,
    error: "try again after an hour",
  },
});

const mainController = require("../../controllers/mockBandController/mainController.js");
let mainRouter = express.Router();

mainRouter.post("/testRoute", mainController.testRoute);

mainRouter.post(
  "/searchEvents",
  searchEventsLimiter,
  mainController.searchEvents
);

mainRouter.post(
  "/createEvents",
  searchEventsLimiter,
  mainController.createEvents
);


module.exports = mainRouter;
