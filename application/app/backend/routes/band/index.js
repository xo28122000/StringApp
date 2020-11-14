const express = require("express");
const rateLimit = require("express-rate-limit");
const bandController = require("../../controllers/bandController/bandController.js");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: "backend/uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

let bandRouter = express.Router();

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 15, // start blocking after 5 requests
  message: {
    success: false,
    error: "try again after an hour",
  },
});

bandRouter.post(
  "/createBand",
  upload.single("imageFile"),
  bandController.createBand
);

bandRouter.post("/searchBands", limiter, bandController.searchBands);

bandRouter.post("/createEvent", bandController.createEvent);

bandRouter.post("/searchEvents", bandController.searchEvents);

bandRouter.post("/getBands", bandController.getBands);

bandRouter.post("/getBandInfo", bandController.createEvent);

module.exports = bandRouter;
