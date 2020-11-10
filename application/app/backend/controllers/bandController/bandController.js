const bandQueries = require("../../db/queries/band.js");

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

  bandQueries.createEvent();
};

module.exports = { createEvent };
