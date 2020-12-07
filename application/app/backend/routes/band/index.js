const express = require("express");

const nodeGeocoder = require("node-geocoder");
const geoCoder = nodeGeocoder({
  provider: "openstreetmap",
});

const bandController = require("../../controllers/bandController/bandController.js");
const isUser = require("../../helpers/middlewares/isUser");
const awsS3 = require("../../lib/aws/s3");

const multer = require("multer");
const geocode = require("../../helpers/middlewares/geocode.js");
const storage = multer.diskStorage({
  destination: "backend/uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    //should validate file format input - must be jpg, jpeg, or png
    if (
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .jpg, .jpeg, or .png formats allowed"));
    }
  },
});

const imageSizeCheck = (req, res, next) => {
  const maxSize = 8 * 1024 * 1024; //for 8 MB

  //validate file size
  if (req.file.buffer.byteLength >= maxSize) {
    //if size too large
    res.send({
      //reject, no next call
      success: false,
      error: "image file must be smaller than 8 MB in size",
    });
  } else {
    //go on to the next file in stack call
    next();
  }
};

let bandRouter = express.Router();

bandRouter.post(
  "/createBand",
  isUser,
  imageSizeCheck,
  upload.single("imageFile"),
  async (req, res, next) => {
    try {
      req.body.location = JSON.parse(req.body.location);
      next();
    } catch (error) {
      await awsS3.clearFile(req.file);
      res.send({ success: false, error: "Location is not parsable" });
    }
  },
  async (req, res, next) => {
    if (req.body.location) {
      try {
        const retObj = await geoCoder.geocode({
          street: req.body.location.street,
          city: req.body.location.city,
          state: req.body.location.state,
          postalcode: req.body.location.zip,
          country: "United States",
        });
        if (
          retObj.length <= 0 ||
          (!retObj[0].city && !req.body.location.city) ||
          !retObj[0].state ||
          !retObj[0].streetName
        ) {
          return res.send({ success: false, error: "location is not valid" });
        } else {
          req.body.location = {
            street: retObj[0].streetName,
            city: retObj[0].city ? retObj[0].city : req.body.location.city,
            state: retObj[0].state,
          };
          req.body.latitude = retObj[0].latitude;
          req.body.longitude = retObj[0].longitude;
          next();
        }
      } catch (err) {
        await awsS3.clearFile(req.file);
        return res.send({ success: false, error: "geolocation error" });
      }
    } else {
      await awsS3.clearFile(req.file);
      return res.send({
        success: false,
        error: "no location provided by user",
      });
    }
  },
  bandController.createBand
);

bandRouter.post("/createEvent", isUser, geocode, bandController.createEvent);

bandRouter.post("/createSetEntry", isUser, bandController.createSetEntry);

bandRouter.post("/createMember", isUser, bandController.createMember);

bandRouter.post("/createBandPost", isUser, bandController.createBandPost);

bandRouter.post("/getBands", bandController.getBands);

bandRouter.post("/getBandInfo", bandController.createEvent);

bandRouter.get("/getBandMembers", bandController.getBandMembers);

bandRouter.post("/searchBands", geocode, bandController.searchBands);

bandRouter.post("/searchEvents", bandController.searchEvents);

module.exports = bandRouter;
