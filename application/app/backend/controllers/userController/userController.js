const userQueries = require("../../db/queries/user.js");
const isUser = require("../../helpers/middlewares/isUser.js");
const awsS3 = require("../../lib/aws/s3");

//TODO fix this
//is this a duplicate of getAccount (see below)
//if so, need to remove
const account = (req, res) => {
  if (isUser()) {
    return res.send({
      success: true,
    });
  } else {
    //console.log(req.body);
    return res.send({
      success: false,
      error: "fields missing for account",
    });
  }
};

//controller for changing name of user account
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
      //console.log(err);
      return res.send({
        success: false,
        error: "internal error when trying to change user name",
      });
    });
};

//controller for changing role of user account
const changeRole = (req, res) => {
  if (!req.body.newRole) {
    return res.send({
      success: false,
      error: "missing field: new role",
    });
  }

  userQueries
    .changeRole(req.user.userId, req.body.newRole)
    .then((retObj) => {
      return res.send({ success: true });
    })
    .catch((err) => {
      //console.log(err);
      return res.send({
        success: false,
        error: "internal error when trying to change user role",
      });
    });
};

//controller for changing phone number of user account
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

//controller for adding a link to a user account
const createLink = async (req, res) => {
  if (!req.body.link || !req.user) {
    return res.send({ success: false, error: "missing field(s)" });
  }

  let retObj = await userQueries.getLink(req.user.userId);
  if(retObj.length !=1){
    return res.send({ success: false, error: "incorrect userid" });
  }
  currentLinks = retObj[0].links
  let currentLength = currentLinks.length;

  if (currentLength >= 400) {
    return res.send({
      success: false,
      error: "too many links, or links too long",
    });
  }

  currentLinks = JSON.parse(currentLinks);
  currentLinks.push(req.body.link);
  currentLinks = JSON.stringify(currentLinks);

  userQueries
    .createLink(req.user.userId, currentLinks)
    .then((retObj) => {
      return res.send({ success: true });
    })
    .catch((err) => {
      return res.send({
        success: false,
        error: "internal error when trying to add link",
      });
    });
};

//controller for deleting a link from a user account
const deleteLink = async (req, res) => {
  if (!req.body.link || !req.user) {
    return res.send({ success: false, error: "missing field(s)" });
  }

  let currentLinks = await userQueries.getLink(req.user.userId);

  currentLinks = JSON.parse(currentLinks);

  for (item in currentLinks) {
    if (currentLinks[item][key] == req.body.link.key) {
      if (currentLinks[item][link] == req.body.link.link) {
        currentLinks.splice(item, 1);
        break;
      }
    }
  }
  currentLinks = JSON.stringify(currentLinks);

  userQueries
    .createLink(req.user.userId, currentLinks)
    .then((retObj) => {
      return res.send({ success: true });
    })
    .catch((err) => {
      return res.send({
        success: false,
        error: "internal error when trying to add link",
      });
    });
};

//controller for getting events of a band
const getEvent = (req, res) => {
  if (!req.body.bandId) {
    //console.log(req.body);
    return res.send({ success: false, error: "title field missing" });
  }
  userQueries
    .getEvent(req.body.bandId)
    .then((retObj) => {
      //console.log("successful retrieval of events from bandId");
      return res.send({ success: true, result: retObj });
    })
    .catch((err) => {
      return res.send({
        success: false,
        error: "internal error retrieving events from bandId",
      });
    });
};

//controller for getting account information from a specific account
const getAccount = (req, res) => {
  if (isUser()) {
    return res.send({
      success: true,
    });
  }
  userQueries
    .getAccount(req.body.userId)
    .then((retObj) => {
      //console.log("successful retrieval of accounts that are logged in");
      return res.send({ success: true, result: retObj });
    })
    .catch((err) => {
      return res.send({
        success: false,
        error: "internal error retrieving accounts from STRINGACCOUNT",
      });
    });
};

//controller for getting all bands of a user and its related information
const getUserBand = (req, res) => {
  if (!req.body.userId) {
    //console.log(req.body);
    return res.send({ success: false, error: "title field missing" });
  }
  bandQueries
    .getUserBand(req.body.userId)
    .then(retObj => {
      //console.log("successful retrieval of bands and its related information from bandId");
      return res.send({ success: true, result: retObj });
    })
    .catch(err => {
      //console.log(err);
      return res.send({
        success: false,
        error: "internal error retrieving band informations from userId"
      });
    });
};

module.exports = {
  account,
  changeName,
  changePhone,
  changeRole,
  createLink,
  deleteLink,
  getEvent,
  getAccount,
  getUserBand,
};
