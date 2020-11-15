const bandQueries = require("../../db/queries/band.js");
const awsS3 = require("../../lib/aws/s3");
const isUser = require("../../helpers/middlewares/isUser.js");
const geocode = require("../../helpers/middlewares/geocode.js");

const createBand = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.numMembers ||
    !req.body.imgUrl ||
    !req.body.location
  ) {
    console.log(req.file);
    console.log(req.body);
    return res.send({ success: false, error: "fields missing" });
  }

  if (!req.body.genre || !req.body.isLookingForMember) {
    console.log(req.file);
    console.log(req.body);
    return res.send({ success: false, error: "fields missing" });
  }

  try {
    let contents = await awsS3.getS3files(
      "csc648-string",
      "verticalPrototype/"
    );

    let fileName = "verticalPrototype/" + (contents.length + 1);
    fileName += "." + req.file.filename.split(".").pop();

    let fileData = await awsS3.getFileData(req.file);
    let result = await awsS3.addS3file("csc648-string", fileName, fileData);

    var locationCoords = {
      locationLat: 3.14,
      locationLong: 3.14,
    };

    try {
      geocode(locationCoords);
    } catch (err) {
      console.log("error geocoding: ");
      console.log(err);
      return res.send({ success: false });
    }

    await bandQueries.createBand(
      req.body.name,
      req.body.numMembers,
      req.body.imgUrl,
      req.body.location,
      locationCoords.locationLat,
      locationCoords.locationLong,
      req.body.genre,
      req.body.isLookingForMember,
      fileName //what does this do? is this imgUrl?
    );

    await awsS3.clearFile(req.file);
    return res.send({ success: true });
  } catch (error) {
    await awsS3.clearFile(req.file);
    return res.send({ success: false });
  }
};

//TODO need to fix middleware
const createEvent = (req, res) => {
  if (
    !req.body.bandId ||
    !req.body.title ||
    !req.body.description ||
    !req.body.date ||
    !req.body.location ||
    !req.body.startTime ||
    !req.body.endTime
  ) {
    console.log(req.body);
    return res.send({
      success: false,
      error: "fields missing for createEvent",
    });
  }
  //TODO middleware fix: need to get correct bandId somehow?
  //or is this a frontEnd problem?

  //TODO middleware fix: also need to get location for correct input
  //for sql queries: locationLat and locationLong
  //which are decimal(30,15)
  bandQueries
    .createEvent(
      req.body.title,
      req.body.description,
      req.body.date,
      req.body.startTime,
      req.body.endTime,
      req.body.location,
      req.body.bandId
    )
    .then((retObj) => {
      console.log("successful creation of event");
      return res.send({ success: true });
    })
    .catch((err) => {
      console.log("internal error creating event");
      console.log(err);
      return res.send({
        success: false,
        error: "internal error when trying to create event",
      });
    });
};

const getBands = (req, res) => {
  if (!req.body.userId) {
    console.log(req.body);
    return res.send({ success: false, error: "title field missing" });
  }
  bandQueries
    .getBands(req.body.userId)
    .then((retObj) => {
      console.log("successful retrieval of bands from userId");
      return res.send({ success: true, result: retObj });
    })
    .catch((err) => {
      return res.send({
        success: false,
        error: "internal error retrieving bands from userId",
      });
    });
  //TODO need to verify if isUser, and get userId from table first
  //TODO make middleware for retrieving userId, bandId?
  /** 
  if (isUser()) {
    return res.send({
      success: true,
    });
  } else {
    console.log(req.body);
    return res.send({
      success: false,
      error: "fields missing for account",
    });
  }
  */
};

const getBandInfo = (req, res) => {
  if (!req.body.bandId) {
    console.log(req.body);
    return res.send({ success: false, error: "bandId field missing" });
  }
  var search = {
    /* name: req.body.name ? req.body.name + "%" : "%",
    type: req.body.type ? req.body.type : "%",
    numMembers: req.body.numMembers ? req.body.numMembers : "%",
    */
    bandId: req.body.bandId ? req.body.bandId : "%",
  };

  bandQueries.getBandInfo(search.bandId);
};

const searchBands = (req, res) => {
  var search = {
    name: req.body.name ? req.body.name + "%" : "%",
    type: req.body.genre ? req.body.genre : "%",
    numMembers: req.body.numMembers ? req.body.numMembers : 1,
    location: req.body.location ? req.body.location : -1,
    locationLat: -1,
    locationLong: -1,
  };

  if (search.location != -1) {
    //call geocode middleware
    geocode(search); //should create values for locationLat, locationLong in search object
  }

  bandQueries
    .searchBands(
      search.name,
      search.genre,
      search.numMembers,
      search.location,
      search.locationLat,
      search.locationLong
    )
    .then((retObj) => {
      return res.send({ success: true, result: retObj });
    })
    .catch((err) => {
      //console.log(err);
      return res.send({ success: false, error: "internal error" });
    });
};

const searchEvents = (req, res) => {
  if (!req.body.title) {
    console.log(req.body);
    return res.send({ success: false, error: "title field missing" });
  }

  var search = {
    name: req.body.title ? req.body.title + "%" : "%",
    date: req.body.date ? req.body.date : "%",
    location: req.body.location ? req.body.location : "%",
    //location
  };

  userQueries
    .searchEvents(search.name, search.date, search.location)
    .then((retObj) => {
      console.log("successful search for events");
      console.log(retObj);
      return res.send({ success: true, result: retObj });
    })
    .catch((err) => {
      return res.send({
        success: false,
        error: "internal error searching for events",
      });
    });
};

module.exports = {
  createBand,
  createEvent,
  getBands,
  getBandInfo,
  searchBands,
  searchEvents,
};