const userQueries = require("../../db/queries/user.js");
const isUser = require("../../helpers/middlewares/isUser.js");
const awsS3 = require("../../lib/aws/s3");

const createBand = async (req, res) => {
  if (!req.body.name || !req.body.type || !req.body.numMembers || !req.file) {
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

    await userQueries.createBand(
      req.body.name,
      req.body.type,
      req.body.numMembers,
      fileName,
      req.body.imageUrl
    );

    await awsS3.clearFile(req.file);
    return res.send({ success: true });
  } catch (error) {
    await awsS3.clearFile(req.file);
    return res.send({ success: false });
  }
};

const searchBands = (req, res) => {
  var search = {
    name: req.body.name ? req.body.name + "%" : "%",
    type: req.body.type ? req.body.type : "%",
    numMembers: req.body.numMembers ? req.body.numMembers : 1,
  };

  userQueries
    .searchBands(search.name, search.type, search.numMembers)
    .then((retObj) => {
      return res.send({ success: true, result: retObj });
    })
    .catch((err) => {
      return res.send({ success: false, error: "internal error" });
    });
};

const createEvent = (req, res) => {
  if (
    !req.body.bandID ||
    !req.body.title ||
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

  userQueries.createEvent();
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

//TODO fix this
const account = (req, res) => {
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
};

const getBands = (req, res) => {
  if (!req.body.userId) {
    console.log(req.body);
    return res.send({ success: false, error: "title field missing" });
  }
  userQueries
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

module.exports = {
  createBand,
  searchBands,
  searchEvents,
  createEvent,
  account,
  getBands,
};
