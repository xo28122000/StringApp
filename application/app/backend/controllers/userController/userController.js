const userQueries = require("../../db/queries/user.js");
const isUser = require("../../helpers/middlewares/isUser.js");
const awsS3 = require("../../lib/aws/s3");

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

const getEvent = (req, res) => {
  if (!req.body.bandId) {
    console.log(req.body);
    return res.send({ success: false, error: "title field missing" });
  }
  userQueries
    .getEvent(req.body.bandId)
    .then((retObj) => {
      console.log("successful retrieval of events from bandId");
      return res.send({ success: true, result: retObj });
    })
    .catch((err) => {
      return res.send({
        success: false,
        error: "internal error retrieving events from bandId",
      });
    });
  };

  const getAccount = (req, res) => {
    if (isUser()) {
      return res.send({
        success: true,
      });
    } 
    userQueries
      .getAccount(req.body.userId)
      .then((retObj) => {
        console.log("successful retrieval of accounts that are logged in");
        return res.send({ success: true, result: retObj });
      })
      .catch((err) => {
        return res.send({
          success: false,
          error: "internal error retrieving accounts from STRINGACCOUNT",
        });
      });
    };

module.exports = {
  searchEvents,
  createEvent,
  account,
  getBands,
  getEvent,
  getAccount
};
