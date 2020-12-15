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
      1
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
      error: "fields missing for createEvent"
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
    .then(retObj => {
      console.log("successful creation of event");
      return res.send({ success: true });
    })
    .catch(err => {
      console.log("internal error creating event");
      console.log(err);
      return res.send({
        success: false,
        error: "internal error when trying to create event"
      });
    });
};

const getBandFromId = (req, res) => {
  if (!req.body.bandId) {
    console.log(req.body);
    return res.send({ success: false, error: "title field missing" });
  }
  bandQueries
    .getBandFromId(req.body.bandId)
    .then(retObj => {
      console.log("successful retrieval of bands from bandId");
      return res.send({ success: true, result: retObj });
    })
    .catch(err => {
      console.log(err);
      return res.send({
        success: false,
        error: "internal error retrieving bands from bandId"
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

const getBandFromName = (req, res) => {
  if (!req.body.name) {
    console.log(req.body);
    return res.send({ success: false, error: "title field missing" });
  }
  bandQueries
    .getBandFromName(req.body.name)
    .then(retObj => {
      console.log("successful retrieval of bands from band name");
      return res.send({ success: true, result: retObj });
    })
    .catch(err => {
      console.log(err);
      return res.send({
        success: false,
        error: "internal error retrieving bands from band name"
      });
    });
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
    bandId: req.body.bandId ? req.body.bandId : "%"
  };

  bandQueries.getBandInfo(search.bandId);
};

const searchBands = (req, res) => {
  var search = {
    name: req.body.name ? req.body.name + "%" : "%",
    genre: req.body.genre ? req.body.genre : "%",
    locationLat: req.body.locationLat ? req.body.locationLat : null,
    locationLong: req.body.locationLong ? req.body.locationLong : null,
    isLookingForMember: req.body.isLookingForMember
      ? req.body.isLookingForMember
      : 0
  };

  bandQueries
    .searchBands(
      search.name,
      search.genre,
      search.locationLat,
      search.locationLong,
      search.isLookingForMember
    )
    .then(retObj => {
      return res.send({ success: true, result: retObj });
    })
    .catch(err => {
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
    location: req.body.location ? req.body.location : "%"
    //location
  };

  userQueries
    .searchEvents(search.name, search.date, search.location)
    .then(retObj => {
      console.log("successful search for events");
      console.log(retObj);
      return res.send({ success: true, result: retObj });
    })
    .catch(err => {
      return res.send({
        success: false,
        error: "internal error searching for events"
      });
    });
};

const getEventList = (req, res) => {
  if (!req.body.eventId) {
    console.log(req.body);
    return res.send({ success: false, error: "eventId field missing" });
  }
  var search = {
    bandId: req.body.eventId ? req.body.eventId : "%"
  };

  bandQueries.getEventList(search.eventId);
};

module.exports = {
  createBand,
  createEvent,
  getBandFromId,
  getBandFromName,
  getBandInfo,
  searchBands,
  searchEvents,
  getEventList
};
