const userQueries = require("../../db/queries/user.js");
const isUser = require("../../helpers/middlewares/isUser.js");
const awsS3 = require("../../lib/aws/s3");

const createBand = async (req, res) => {
  if (!req.body.name || !req.body.type || !req.body.numMembers || !req.file) {
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

    await mainBandQueries.createBand(
      req.body.name,
      req.body.type,
      req.body.numMembers,
      fileName
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
  if (!req.body.title || !req.body.date || !req.body.location) {
    console.log(req.body);
    return res.send({ success: false, error: "fields missing" });
  }

  var search = {
    name: req.body.title ? req.body.title + "%" : "%",
    type: req.body.date ? req.body.date : "%",
    //location
  };

  userQueries
    .searchEvents()
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

//TODO fix this
const getBands = (req, res) => {
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

module.exports = {
  createBand,
  searchBands,
  searchEvents,
  createEvent,
  account,
  getBands,
};
