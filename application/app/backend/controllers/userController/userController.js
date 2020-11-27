const userQueries = require("../../db/queries/user.js");
const isUser = require("../../helpers/middlewares/isUser.js");
const awsS3 = require("../../lib/aws/s3");

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

const changeName = (req, res) => {
  if (!req.body.newName) {
    return res.send({
      success: false,
      error: "missing field: new name",
    });
  }

  userQueries
    .changeName(req.user.userId, req.body.newName)
    .then((retObj) => {
      return res.send({ success: true });
    })
    .catch((err) => {
      console.log(err);
      return res.send({
        success: false,
        error: "internal error when trying to change user name",
      });
    });
};

const changePhone = (req, res) => {
  if (!req.body.phoneNumber) {
    return res.send({
      success: false,
      error: "missing field: phone number",
    });
  }

  userQueries
    .changePhone(req.user.userId, req.body.phoneNumber)
    .then((retObj) => {
      return res.send({ success: true });
    })
    .catch((err) => {
      //console.log(err);
      return res.send({
        success: false,
        error: "internal error when trying to change user phone number",
      });
    });
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
  account,
  changeName,
  changePhone,
  getEvent,
  getAccount,
};
