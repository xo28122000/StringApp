const express = require("express");
const bandController = require("../../controllers/bandController/bandController.js");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: "backend/uploads",
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

let bandRouter = express.Router();

bandRouter.post(
  "/createBand",
  upload.single("imageFile"),
  bandController.createBand
);

bandRouter.post("/searchBands", bandController.searchBands);

bandRouter.post("/createEvent", bandController.createEvent);

bandRouter.post("/searchEvents", bandController.searchEvents);

bandRouter.post("/getBands", bandController.getBands);

bandRouter.post("/getBandInfo", bandController.createEvent);

module.exports = bandRouter;
