const bandQueries = require("../../db/queries/band.js");
const awsS3 = require("../../lib/aws/s3");
const isUser = require("../../helpers/middlewares/isUser.js");

const createBand = async (req, res) => {
  if (!req.body.name || !req.body.location || !req.file || !req.body.genre) {
    // console.log(req.file);
    // console.log(req.body);
    return res.send({ success: false, error: "fields missing" });
  }

  try {
    let contents = await awsS3.getS3files("csc648-string", "M3/");

    let fileName = "M3/" + (contents.length + 1);
    fileName += "." + req.file.filename.split(".").pop();

    let fileData = await awsS3.getFileData(req.file);
    let result = await awsS3.addS3file("csc648-string", fileName, fileData);

    const imgUrl =
      "https://csc648-string.s3-us-west-1.amazonaws.com/" + fileName;

    await bandQueries.createBand(
      req.body.name,
      imgUrl,
      JSON.stringify(req.body.location),
      req.body.latitude,
      req.body.longitude,
      req.body.genre,
      1,
      req.user.userId
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
      return res.send({ success: true });
    })
    .catch((err) => {
      return res.send({
        success: false,
        error: "internal error when trying to create event",
      });
    });
};

const createMember = (req, res) => {
  if (!req.user) {
    return res.send({
      success: false,
      error: "Must be a logged in user to proceed.",
    });
  }

  bandQueries
    .createMember(
      req.body.isBandAdmin,
      req.body.role,
      req.body.dateJoined,
      req.user.userId,
      req.body.bandId
    )
    .then((retObj) => {
      return res.send({ success: true });
    })
    .catch((err) => {
      return res.send({
        success: false,
        error: "internal error creating a band member",
      });
    });
};

const getBands = (req, res) => {
  if (!req.body.userId) {
    return res.send({ success: false, error: "title field missing" });
  }
  bandQueries
    .getBands(req.body.userId)
    .then((retObj) => {
      return res.send({ success: true, result: retObj });
    })
    .catch((err) => {
      //console.log(err);
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

const getBandMembers = (req, res) => {
  if (!req.body.bandId) {
    return res.send({ success: false, error: "bandId field missing" });
  }

  bandQueries.getBandMembers(req.body.bandId);
};

const searchBands = (req, res) => {
  var search = {
    name: req.body.name ? req.body.name + "%" : "%",
    genre: req.body.genre ? req.body.genre : "%",
    locationLat: req.body.locationLat ? req.body.locationLat : null,
    locationLong: req.body.locationLong ? req.body.locationLong : null,
    isLookingForMember: req.body.isLookingForMember
      ? req.body.isLookingForMember
      : 0,
  };

  bandQueries
    .searchBands(
      search.name,
      search.genre,
      search.locationLat,
      search.locationLong,
      search.isLookingForMember
    )
    .then((retObj) => {
      return res.send({ success: true, result: retObj });
    })
    .catch((err) => {
      return res.send({ success: false, error: "internal error" });
    });
};

const searchEvents = (req, res) => {
  if (!req.body.title) {
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
  createMember,
  getBands,
  getBandInfo,
  getBandMembers,
  searchBands,
  searchEvents,
};
