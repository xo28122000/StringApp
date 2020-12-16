const express = require("express");

const nodeGeocoder = require("node-geocoder");
const geoCoder = nodeGeocoder({
  provider: "openstreetmap"
});

const bandController = require("../../controllers/bandController/bandController.js");
const isUser = require("../../helpers/middlewares/isUser");
const isMember = require("../../helpers/middlewares/isMember");
const awsS3 = require("../../lib/aws/s3");

const multer = require("multer");
const geocode = require("../../helpers/middlewares/geocode.js");
const storage = multer.diskStorage({
  destination: "backend/uploads",
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

//for uploading files using multer
const upload = multer({
  //multer settings
  storage: storage
  // fileFilter: (req, file, cb) => {
  //   let ext = path.extname(file.originalname);
  //   //should validate file format input - must be jpg, jpeg, or png
  //   if (ext == ".jpg" || ext == ".jpeg" || ext == ".png") {
  //     cb(null, true);
  //   } else {
  //     cb(null, false);
  //     return cb(new Error("Only .jpg, .jpeg, or .png formats allowed"));
  //   }
  // },
  // limits: {
  //   fileSize: 8 * 1024 * 1024, //for 8 MB image size limit
  // },
});

/** 

const imageSizeCheck = (req, res, next) => {
  const maxSize = 8 * 1024 * 1024; //for 8 MB
  /** 
  //TODO not working right now
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
  next();
};

*/

let bandRouter = express.Router();

//route definition for creating a new band
bandRouter.post(
  "/createBand",
  isUser,
  //imageSizeCheck,
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
  (req, res, next) => {
    console.log("reaching here");
    next();
  },
  bandController.createBand
);

//route definition for creating a new event
bandRouter.post("/createEvent", isUser, geocode, bandController.createEvent);

//route definition for adding an entry to a band's repertoire
bandRouter.post("/createRep", isUser, bandController.createRep);

//route definition for creating a new set entry
bandRouter.post("/createSetEntry", isUser, bandController.createSetEntry);

//route definition for creating a new member of a band
bandRouter.post("/createMember", isUser, bandController.createMember);

//route definition for creating a new band post
bandRouter.post("/createBandPost", isUser, bandController.createBandPost);

//route definition for deleting a band post
bandRouter.post("/deleteBandPost", isUser, bandController.deleteBandPost);

//route definition for deleting a repertoire entry
bandRouter.post("/deleteRep", isUser, bandController.deleteRep);

//route definition for deleting a repertoire entry
bandRouter.post("/deleteEvent", isUser, bandController.deleteEvent);

//route definition for getting all the bands that someone is a member of
bandRouter.post("/getBandFromId", bandController.getBandFromId);

bandRouter.post("/getBandFromName", bandController.getBandFromName);

//route definition for getting the members of a band
bandRouter.post("/getBandMembers", bandController.getBandMembers);

//route definition for getting the information about a band
bandRouter.post("/getBandInfo", bandController.createEvent);

//route definition for getting all posts of a specific band
bandRouter.post("/getBandPosts", bandController.getBandPosts);

//route definition for getting all the repertoire of a specific band
bandRouter.post("/getBandRep", bandController.getBandRep);

//route definition for getting all the events of a specific band
bandRouter.post("/getEvents", bandController.getEvents);

//route definition for searching for (a) band(s)
bandRouter.post("/searchBands", geocode, bandController.searchBands);

//route definition for searching for (an) event(s)
bandRouter.post("/searchEvents", bandController.searchEvents);

module.exports = bandRouter;
