const bandQueries = require("../../db/queries/band.js");
const awsS3 = require("../../lib/aws/s3");
const isUser = require("../../helpers/middlewares/isUser.js");

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
      JSON.stringify(req.body.location),
      req.body.latitude,
      req.body.longitude,
      req.body.genre,
      true
    );

    //console.log("just created band: " + newBand);

    let today = new Date();

    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;

    await bandQueries.createMember(
      true,
      "Band Admin",
      today,
      req.user.userId,
      newBand.insertId
    );

    await awsS3.clearFile(req.file);
    return res.send({ success: true });
  } catch (error) {
    await awsS3.clearFile(req.file);
    return res.send({ success: false });
  }
};

//controller to create a new band post
const createBandPost = (req, res) => {
  if (!req.user) {
    //is a registered user
    return res.send({ success: false, error: "error in userId field" });
  }

  let member = isMember(req, res);

  if (member) {
    bandQueries.createBandPost(
      req.body.media,
      req.body.title,
      req.body.description,
      req.body.bandId
    );
    return res.send({ success: true });
  } else {
    return res.send({
      success: false,
      error: "internal error creating Band Post",
    });
  }
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
      error: "fields missing for createEvent",
    });
  }

  let member = isMember(req, res);

  console.log("member: " + member);
  if (member) {
    bandQueries
      .createEvent(
        req.body.title,
        req.body.description,
        req.body.date,
        req.body.startTime,
        req.body.endTime,
        req.body.location,
        req.body.locationLat,
        req.body.locationLong,
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
  } else {
    return res.send({
      success: false,
      error: "internal error creating Event",
    });
  }
};

//controller for creating a new member of a band
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

//controller for creating a new set entry for an event
const createSetEntry = (req, res) => {
  let member = isMember(req, res);
  if (member == true) {
    console.log("member: " + member);
    bandQueries
      .createSetEntry(req.body.songName, req.body.runTime, req.body.eventId)
      .then((retObj) => {
        return res.send({ success: true });
      })
      .catch((err) => {
        return res.send({
          success: false,
          error: "internal error creating a band Set Entry",
        });
      });
  } else {
    return res.send({
      success: false,
      error:
        "not a member of the band for which Set Entry is attempting to be created",
    });
  }
};

//controller for getting all bands a user is a member of
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
    bandId: req.body.bandId ? req.body.bandId : "%",
  };

  bandQueries.getBandInfo(search.bandId);
};

//controller for getting all members of a band given a band id
const getBandMembers = (req, res) => {
  if (!req.body.bandId) {
    return res.send({ success: false, error: "bandId field missing" });
  }

  bandQueries
    .getBandMembers(req.body.bandId)
    .then((retObj) => {
      return res.send({ success: true, result: retObj });
    })
    .catch((err) => {
      //console.log(err);
      return res.send({
        success: false,
        error: "internal error retrieving al members of a band from bandId",
      });
    });
};

//controller for getting all posts of a band given a band id
const getBandPosts = (req, res) => {
  if (!req.body.bandId) {
    return res.send({ success: false, error: "bandId field missing" });
  }

  bandQueries
    .getBandPosts(req.body.bandId)
    .then((retObj) => {
      return res.send({ success: true, result: retObj });
    })
    .catch((err) => {
      //console.log(err);
      return res.send({
        success: false,
        error: "internal error retrieving posts of a band from bandId",
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
    .then((retObj) => {
      return res.send({ success: true, result: retObj });
    })
    .catch((err) => {
      //console.log(err);
      return res.send({
        success: false,
        error: "internal error retrieving repertoire from bandId",
      });
    });
};

//controller for getting all events of a band given a band id
const getEvents = (req, res) => {
  if (!req.body.bandId) {
    return res.send({ success: false, error: "bandId field missing" });
  }

  bandQueries
    .getEvents(req.body.bandId)
    .then((retObj) => {
      return res.send({ success: true, result: retObj });
    })
    .catch((err) => {
      //console.log(err);
      return res.send({
        success: false,
        error: "internal error retrieving events from bandId",
      });
    });
};

const isMember = async (req, res) => {
  //internal helper function for band membership verification
  //console.log("called inside isMember");
  if (!req.body.bandId) {
    console.log("bandId field missing");
  } else if (!req.user) {
    //console.log("Must be a logged in user to proceed.");
  }

  let member = await bandQueries.isMember(req.user.userId, req.body.bandId);
  console.log("member: " + member);

  if (member == true) {
    console.log("isMember is returning true");
    return true;
  } else {
    console.log("isMember is returning false");
    return false;
  }
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

//controller for searching for an event given certain criteria
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
  createBandPost,
  createEvent,
  createSetEntry,
  createMember,
  getBands,
  getBandInfo,
  getBandMembers,
  getBandPosts,
  getBandRep,
  getEvents,
  isMember,
  searchBands,
  searchEvents,
};
