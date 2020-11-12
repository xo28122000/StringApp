const bandQueries = require("../../db/queries/band.js");

const awsS3 = require("../../lib/aws/s3");

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

module.exports = { createEvent };
