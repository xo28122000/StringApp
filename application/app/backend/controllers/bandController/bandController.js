const bandQueries = require("../../db/queries/band.js");
const stringAccountQueries = require("../../db/queries/stringAccount.js");
const awsS3 = require("../../lib/aws/s3");
const isUser = require("../../helpers/middlewares/isUser.js");

//controller to accept an invitation and create a new band member
const acceptInvite = async (req, res) => {
  if (!req.body.bandId || !req.body.inviteId || !req.body.userId) {
    //is a registered user
    return res.send({ success: false, error: "field(s) missing" });
  }

  let today = new Date();

  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  bandQueries
    .createMember(
      0, //is NOT a band admin
      "-",
      today,
      req.body.userId,
      req.body.bandId
    )
    .then(retObj => {
      bandQueries
        .deleteInvite(req.body.inviteId)
        .then(retObj => {
          return res.send({ success: true });
        })
        .catch(err => {
          return res.send({
            success: false,
            error: "internal error when trying to delete accepted Invitation"
          });
        });
    })
    .catch(err => {
      return res.send({
        success: false,
        error: "internal error when trying to accept Invitation"
      });
    });
};

//controller for creating a band
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

    let newBand = await bandQueries.createBand(
      req.body.name,
      imgUrl,
      JSON.stringify([]), //list of links as a JSON object
      req.body.description,
      JSON.stringify(req.body.location),
      req.body.latitude,
      req.body.longitude,
      req.body.genre,
      1
    );

    //console.log("just created band: " + newBand);

    let today = new Date();

    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;

    await bandQueries.createMember(
      1,
      "Band Admin",
      today,
      req.user.userId,
      newBand.insertId
    );

    await awsS3.clearFile(req.file);
    return res.send({ success: true });
  } catch (error) {
    //console.log(error);
    await awsS3.clearFile(req.file);
    return res.send({ success: false });
  }
};

//controller to create a new band post
const createBandPost = (req, res) => {
  if (!req.body.bandId) {
    //is a registered user
    return res.send({ success: false, error: "bandId field missing" });
  }

  bandQueries
    .createBandPost(
      req.body.media,
      req.body.title,
      req.body.description,
      req.body.bandId
    )
    .then(retObj => {
      return res.send({ success: true });
    })
    .catch(err => {
      return res.send({
        success: false,
        error: "internal error when trying to create Band Post"
      });
    });
};

//TODO need to test
//controller for creating a new event
const createEvent = (req, res) => {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.date ||
    !req.body.startTime ||
    !req.body.endTime ||
    !req.body.location ||
    !req.body.locationLat ||
    !req.body.locationLong ||
    !req.body.bandId
  ) {
    return res.send({
      success: false,
      error: "fields missing for createEvent"
    });
  }

  //console.log(req.body.location);

  bandQueries
    .createEvent(
      req.body.title,
      req.body.description,
      req.body.date,
      req.body.startTime,
      req.body.endTime,
      JSON.stringify(req.body.location),
      req.body.locationLat,
      req.body.locationLong,
      req.body.bandId
    )
    .then(retObj => {
      return res.send({ success: true });
    })
    .catch(err => {
      //console.log(err);
      return res.send({
        success: false,
        error: "internal error when trying to create event"
      });
    });
};

//controller for adding a link to a band account
const createLink = async (req, res) => {
  if (!req.body.link || !req.user) {
    return res.send({ success: false, error: "missing field(s)" });
  }

  let retObj = await bandQueries.getLink(req.body.bandId);
  if (retObj.length != 1) {
    return res.send({ success: false, error: "incorrect userid" });
  }
  currentLinks = retObj[0].links;
  let currentLength = currentLinks.length;

  if (currentLength >= 400) {
    return res.send({
      success: false,
      error: "too many links, or links too long"
    });
  }

  currentLinks = JSON.parse(currentLinks);
  currentLinks.push(req.body.link);
  currentLinks = JSON.stringify(currentLinks);

  bandQueries
    .createLink(req.body.bandId, currentLinks)
    .then(retObj => {
      return res.send({ success: true });
    })
    .catch(err => {
      return res.send({
        success: false,
        error: "internal error when trying to add link"
      });
    });
};

//controller for creating a new member of a band
const createMember = (req, res) => {
  if (!req.user) {
    return res.send({
      success: false,
      error: "Must be a logged in user to proceed."
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
    .then(retObj => {
      return res.send({ success: true });
    })
    .catch(err => {
      return res.send({
        success: false,
        error: "internal error creating a band member"
      });
    });
};

//controller for adding a repertoire entry to a band
const createRep = (req, res) => {
  if (!req.body.bandId) {
    return res.send({ success: false, error: "bandId field missing" });
  }
  if (
    !req.body.songName ||
    !req.body.runTime ||
    !req.body.genre ||
    !req.body.link
  ) {
    return res.send({
      success: false,
      error: "fields missing for adding repertoire"
    });
  }

  bandQueries
    .createRep(
      req.body.songName,
      req.body.runTime,
      req.body.genre,
      req.body.link,
      req.body.bandId
    )
    .then(retObj => {
      return res.send({ success: true });
    })
    .catch(err => {
      return res.send({
        success: false,
        error: "internal error creating a band Repertoire Entry"
      });
    });
};

//controller for creating a new set entry for an event
const createSetEntry = (req, res) => {
  bandQueries
    .createSetEntry(req.body.songName, req.body.runTime, req.body.eventId)
    .then(retObj => {
      return res.send({ success: true });
    })
    .catch(err => {
      return res.send({
        success: false,
        error: "internal error creating a band Set Entry"
      });
    });
};

//controller for deleting a band post
const deleteBandPost = (req, res) => {
  if (!req.body.bandPostId) {
    return res.send({
      success: false,
      error: "fields missing for deleting Band Post"
    });
  }

  bandQueries
    .deleteBandPost(req.body.bandPostId)
    .then(retObj => {
      return res.send({ success: true });
    })
    .catch(err => {
      return res.send({
        success: false,
        error: "internal error deleting a Band Post"
      });
    });
};

//controller for deleting an event
const deleteEvent = (req, res) => {
  if (!req.body.eventId) {
    return res.send({
      success: false,
      error: "fields missing for deleting Event"
    });
  }

  bandQueries
    .deleteEvent(req.body.eventId)
    .then(retObj => {
      return res.send({ success: true });
    })
    .catch(err => {
      return res.send({
        success: false,
        error: "internal error deleting a band Event"
      });
    });
};

//controller for deleting a link from a band account
const deleteLink = async (req, res) => {
  if (!req.body.link || !req.user) {
    return res.send({ success: false, error: "missing field(s)" });
  }

  let currentLinks = await bandQueries.getLink(req.body.bandId);
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

  bandQueries
    .createLink(req.body.bandId, currentLinks)
    .then(retObj => {
      return res.send({ success: true });
    })
    .catch(err => {
      return res.send({
        success: false,
        error: "internal error when trying to delete band link"
      });
    });
};

//controller for deleting a band
const deleteBand = async (req, res) => {
  if (!req.body.bandId) {
    return res.send({ success: false, error: "missing bandId field" });
  }

  bandQueries
    .deleteBand(req.body.bandId)
    .then(retObj => {
      return res.send({ success: true });
    })
    .catch(err => {
      return res.send({
        success: false,
        error: "internal error when trying to delete band"
      });
    });
};

//controller for deleting an invite
const deleteInvite = async (req, res) => {
  if (!req.body.inviteId) {
    return res.send({ success: false, error: "missing inviteId field" });
  }

  bandQueries
    .deleteInvite(req.body.inviteId)
    .then(retObj => {
      return res.send({ success: true });
    })
    .catch(err => {
      return res.send({
        success: false,
        error: "internal error when trying to delete invitation"
      });
    });
};

//controller for deleting a member from a band
const deleteMember = async (req, res) => {
  if (!req.body.bandMemberId || !req.body.bandId) {
    return res.send({ success: false, error: "missing field(s)" });
  }

  bandQueries
    .deleteMember(req.body.bandMemberId)
    .then(retObj => {
      bandQueries
        .decrementMember(req.body.bandId)
        .then(retObj => {
          return res.send({ success: true });
        })
        .catch(err => {
          return res.send({
            success: false,
            error: "internal error when trying to decrement numMembers"
          });
        });
    })
    .catch(err => {
      return res.send({
        success: false,
        error: "internal error when trying to delete member from band"
      });
    });
};

//controller for deleting a band's repertoire entry
const deleteRep = (req, res) => {
  if (!req.body.repId) {
    return res.send({
      success: false,
      error: "fields missing for deleting repertoire"
    });
  }

  bandQueries
    .deleteRep(req.body.repId)
    .then(retObj => {
      return res.send({ success: true });
    })
    .catch(err => {
      return res.send({
        success: false,
        error: "internal error deleting a band Rep Entry"
      });
    });
};

//controller for editing a band's information
const editBandInfo = (req, res) => {
  if (!req.body.bandId) {
    return res.send({
      success: false,
      error: "bandId field missing"
    });
  }

  //console.log(req.body.location);

  bandQueries
    .editBandInfo(
      req.body.bandId,
      req.body.name,
      req.body.description,
      JSON.stringify(req.body.location),
      req.body.locationLat,
      req.body.locationLong,
      req.body.genre
    )
    .then(retObj => {
      return res.send({ success: true });
    })
    .catch(err => {
      //console.log(err);
      return res.send({
        success: false,
        error: "internal error editing Band Information"
      });
    });
};

//controller for getting a band by bandId
const getBandFromId = (req, res) => {
  if (!req.body.bandId) {
    return res.send({ success: false, error: "title field missing" });
  }
  bandQueries
    .getBandFromId(req.body.name)
    .then(retObj => {
      if (retObj.length === 1) {
        return res.send({
          success: true,
          band: {
            ...retObj[0],
            links: JSON.parse(retObj[0].links),
            location: JSON.parse(retObj[0].location)
          }
        });
      } else {
        return res.send({
          success: false,
          error: "no band with this id found"
        });
      }
    })
    .catch(err => {
      //console.log(err);
      return res.send({
        success: false,
        error: "internal error retrieving bands from band id"
      });
    });
};

const getBandFromName = (req, res) => {
  if (!req.body.name) {
    return res.send({ success: false, error: "title field missing" });
  }
  bandQueries
    .getBandFromName(req.body.name)
    .then(retObj => {
      if (retObj.length === 1) {
        return res.send({
          success: true,
          band: {
            ...retObj[0],
            links: JSON.parse(retObj[0].links),
            location: JSON.parse(retObj[0].location)
          }
        });
      } else {
        return res.send({
          success: false,
          error:
            "no band with this name found or more than one band have this name"
        });
      }
    })
    .catch(err => {
      //console.log(err);
      return res.send({
        success: false,
        error: "internal error retrieving bands from band name"
      });
    });
};

//controller for getting band information from a band id
const getBandInfo = (req, res) => {
  if (!req.body.bandId) {
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

//controller for getting all members of a band given a band id
const getBandMembers = async (req, res) => {
  if (!req.body.bandId) {
    return res.send({ success: false, error: "bandId field missing" });
  }
  try {
    let bandMembers = await bandQueries.getBandMembers(req.body.bandId);
    return res.send({
      success: true,
      bandMembers
    });
  } catch (err) {
    //console.log(err);
    return res.send({
      success: false,
      error: "internal error retrieving band members from bandId"
    });
  }
};

//controller for getting all posts of a band given a band id
const getBandPosts = (req, res) => {
  if (!req.body.bandId) {
    return res.send({ success: false, error: "bandId field missing" });
  }

  bandQueries
    .getBandPosts(req.body.bandId)
    .then(retObj => {
      return res.send({ success: true, result: retObj });
    })
    .catch(err => {
      //console.log(err);
      return res.send({
        success: false,
        error: "internal error retrieving posts of a band from bandId"
      });
    });
};

//controller for getting all repertoire of a band given a band id
const getBandRep = (req, res) => {
  if (!req.body.bandId) {
    return res.send({ success: false, error: "bandId field missing" });
  }

  bandQueries
    .getBandRep(req.body.bandId)
    .then(retObj => {
      return res.send({ success: true, result: retObj });
    })
    .catch(err => {
      //console.log(err);
      return res.send({
        success: false,
        error: "internal error retrieving repertoire from bandId"
      });
    });
};

//controller for getting all events of a band given a band id
const getEvents = (req, res) => {
  if (!req.body.bandId) {
    //console.log(req.body);
    return res.send({ success: false, error: "title field missing" });
  }
  bandQueries
    .getEvents(req.body.bandId)
    .then(retObj => {
      //console.log("successful retrieval of band events from bandId");
      for (let i = 0; i < retObj.length; i++) {
        retObj[i].location = JSON.parse(retObj[i].location);
      }
      return res.send({ success: true, result: retObj });
    })
    .catch(err => {
      //console.log(err);
      return res.send({
        success: false,
        error: "internal error retrieving band events from bandId"
      });
    });
};

//controller for getting all invitations of a band given a band id
const getInvites = (req, res) => {
  if (!req.body.bandId) {
    //console.log(req.body);
    return res.send({ success: false, error: "bandId field missing" });
  }
  bandQueries
    .getInvites(req.body.bandId)
    .then(retObj => {
      //console.log("successful retrieval of band events from bandId");
      return res.send({ success: true, result: retObj });
    })
    .catch(err => {
      //console.log(err);
      return res.send({
        success: false,
        error: "internal error retrieving band invitations from bandId"
      });
    });
};

//controller for getting all events of a band given a band id
const getIsLookingForMembers = async (req, res) => {
  if (!req.body.bandId) {
    //console.log(req.body);
    return res.send({ success: false, error: "bandId field missing" });
  }

  await bandQueries
    .getIsLookingForMembers(req.body.bandId)
    .then(retObj => {
      let isLooking = retObj[0].isLookingForMember;
      if (isLooking == 1) {
        isLooking = true;
      } else {
        isLooking = false;
      }
      //console.log(retObj);
      return res.send({
        success: true,
        isLookingForMember: isLooking,
        result: retObj
      });
    })
    .catch(err => {
      //console.log(err);
      return res.send({
        success: false,
        error: "internal error getting if band is looking for members or not"
      });
    });
};

//controller for searching for a band given different criteria
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

//controller for searching for an event given certain criteria
const searchEvents = (req, res) => {
  if (!req.body.title) {
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
      return res.send({ success: true, result: retObj });
    })
    .catch(err => {
      return res.send({
        success: false,
        error: "internal error searching for events"
      });
    });
};

//controller for searching for an event given certain criteria
const setIsLookingForMembers = (req, res) => {
  if (!req.body.bandId) {
    return res.send({ success: false, error: "bandId field missing" });
  }

  //console.log("req.body.isLooking: " + req.body.isLooking);

  let isLooking;

  if (req.body.isLooking == true) {
    //req.body.isLooking should be boolean
    isLooking = 1;
  } else if (req.body.isLooking == false) {
    isLooking = 0;
  }

  //console.log("isLooking: " + isLooking);

  bandQueries
    .setIsLookingForMembers(req.body.bandId, isLooking)
    .then(retObj => {
      return res.send({ success: true, result: retObj });
    })
    .catch(err => {
      //console.log(err);
      return res.send({
        success: false,
        error: "internal error setting if band is looking for members or not"
      });
    });
};

module.exports = {
  acceptInvite,
  createRep,
  createBand,
  createBandPost,
  createEvent,
  createLink,
  createMember,
  createSetEntry,
  deleteBand,
  deleteBandPost,
  deleteEvent,
  deleteInvite,
  deleteLink,
  deleteMember,
  deleteRep,
  editBandInfo,
  getBandFromId,
  getBandFromName,
  getBandMembers,
  getBandInfo,
  getBandPosts,
  getBandRep,
  getEvents,
  getInvites,
  getIsLookingForMembers,
  searchBands,
  searchEvents,
  setIsLookingForMembers
};
