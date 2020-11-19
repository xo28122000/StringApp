const express = require("express");

const nodeGeocoder = require("node-geocoder");
const geoCoder = nodeGeocoder({
  provider: "openstreetmap"
});

const bandController = require("../../controllers/bandController/bandController.js");
const isUser = require("../../helpers/middlewares/isUser");
const awsS3 = require("../../lib/aws/s3");

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
  isUser,
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
          country: "United States"
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
            state: retObj[0].state
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
        error: "no location provided by user"
      });
    }
  },
  bandController.createBand
);

bandRouter.post(
  "/searchBands",
  async (req, res, next) => {
    if (req.body.location) {
      try {
        const retObj = await geoCoder.geocode({
          street: req.body.location.street,
          city: req.body.location.city,
          state: req.body.location.state,
          postalcode: req.body.location.zip,
          country: "United States"
        });

        req.body.locationLat = retObj[0].latitude;
        req.body.locationLong = retObj[0].longitude;

        next();
      } catch (err) {
        return res.send({ success: false, error: "geolocation error" });
      }
    } else {
      next();
    }
    // else {
    //   return res.send({
    //     success: false,
    //     error: "no location provided by user",
    //   });
    // }
  },
  bandController.searchBands
);

bandRouter.post("/createEvent", bandController.createEvent);

bandRouter.post("/searchEvents", bandController.searchEvents);

bandRouter.post("/getBands", bandController.getBands);

bandRouter.post("/getBandInfo", bandController.createEvent);

module.exports = bandRouter;
