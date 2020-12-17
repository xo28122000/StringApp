const userQueries = require("../../db/queries/user.js");
const isUser = require("../../helpers/middlewares/isUser.js");
const awsS3 = require("../../lib/aws/s3");
const bcrypt = require("bcryptjs");

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
  if (retObj.length != 1) {
    return res.send({ success: false, error: "incorrect userid" });
  }
  currentLinks = retObj[0].links;
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
  if (currentLinks.length !== 1) {
    return res.send({ success: false });
  }
  currentLinks = currentLinks[0].links;

  currentLinks = JSON.parse(currentLinks);

  for (item in currentLinks) {
    if (currentLinks[item]["key"] == req.body.link.key) {
      if (currentLinks[item]["link"] == req.body.link.link) {
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
        error: "internal error when trying to delete user link",
      });
    });
};

//controller for editing profile of the registered users
const editUserInfo = (req, res) => {
  if (!req.user.userId || !req.body.name || !req.body.role) {
    //console.log(req.body);
    return res.send({ success: false, error: "fields missing" });
  }
  if (req.body.password && req.body.password.length > 0) {
    //password is present
    const hashedPassword = bcrypt.hashSync(password, 12);
    userQueries
      .editUserInfoPassword(
        req.user.userId,
        req.body.name,
        hashedPassword,
        req.body.role,
        req.body.imageURL
      )
      .then((retObj) => {
        //console.log("successful editing of user info from userId");
        return res.send({ success: true, result: retObj });
      })
      .catch((err) => {
        //console.log(err);
        return res.send({
          success: false,
          error:
            "internal error editing user information and password from userId",
        });
      });
  } else {
    //no password present
    userQueries
      .editUserInfo(
        req.user.userId,
        req.body.name,
        req.body.role,
        req.body.imageURL
      )
      .then((retObj) => {
        //console.log("successful editing of user info from userId");
        return res.send({ success: true, result: retObj });
      })
      .catch((err) => {
        //console.log(err);
        return res.send({
          success: false,
          error: "internal error editing user informations from userId",
        });
      });
  }
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
  if (!req.user.userId) {
    //console.log(req.body);
    return res.send({ success: false, error: "userId field missing" });
  }
  userQueries
    .getUserBand(req.user.userId)
    .then((retObj) => {
      //console.log("successful retrieval of bands and its related information from bandId");
      for (let i = 0; i < retObj.length; i++) {
        retObj[i].location = JSON.parse(retObj[i].location);
        retObj[i].links = JSON.parse(retObj[i].links);
      }
      return res.send({ success: true, result: retObj });
    })
    .catch((err) => {
      //console.log(err);
      return res.send({
        success: false,
        error: "internal error retrieving band informations from userId",
      });
    });
};

//controller for sending invite from registered users
const sendInvite = (req, res) => {
  if (!req.user.userId || !req.body.bandId) {
    //console.log(req.body);
    return res.send({ success: false, error: "field(s) missing" });
  }

  let sentByBand = 0;

  let today = new Date();

  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  userQueries
    .sendInvite(
      req.body.message,
      today,
      sentByBand,
      req.user.userId,
      req.body.bandId
    )
    .then((retObj) => {
      //console.log("successful editing of user info from userId");
      return res.send({ success: true });
    })
    .catch((err) => {
      //console.log(err);
      return res.send({
        success: false,
        error: "internal error sending invite from user",
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
  editUserInfo,
  sendInvite,
};
