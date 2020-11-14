const bandQueries = require("../../db/queries/band.js");
const awsS3 = require("../../lib/aws/s3");
const isUser = require("../../helpers/middlewares/isUser.js");

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

    await bandQueries.createBand(
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

  bandQueries
    .searchBands(search.name, search.type, search.numMembers)
    .then((retObj) => {
      return res.send({ success: true, result: retObj });
    })
    .catch((err) => {
      return res.send({ success: false, error: "internal error" });
    });
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

const getBandInfo = (req, res) => {
  var search = {
   /* name: req.body.name ? req.body.name + "%" : "%",
    type: req.body.type ? req.body.type : "%",
    numMembers: req.body.numMembers ? req.body.numMembers : "%",
    */
   name: req.body.name ? req.body.name + "%" : "%",
  };

  bandQueries
    .getBandInfo(search.bandId)
    .then((retObj) => {
      return res.send({ success: true, result: retObj });
    })
    .catch((err) => {
      return res.send({ success: false, error: "internal error" });
    });
};

module.exports = { createBand, searchBands, createEvent, getBandInfo
};
