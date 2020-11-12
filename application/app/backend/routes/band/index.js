const express = require("express");
const rateLimit = require("express-rate-limit");
const bandController = require("../../controllers/bandController/bandController.js");

let bandRouter = express.Router();

const createEventLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 15, // start blocking after 5 requests
  message: {
    success: false,
    error: "try again after an hour",
  },
});

bandRouter.post("/createEvent", bandController.createEvent);

bandRouter.post("/getBandInfo", bandController.createEvent);

module.exports = bandRouter;
