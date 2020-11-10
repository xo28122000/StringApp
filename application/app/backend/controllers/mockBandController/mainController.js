const mainQuerries = require("../../db/queries/main.js");

const testRoute = (req, res) => {
  return res.send({
    success: true,
    message: "no errors in new main controller file",
  });
};

const searchEvents = (req, res) => {
  if (!req.body.title || !req.body.date || !req.body.location) {
    console.log(req.body);
    return res.send({ success: false, error: "fields missing" });
  }

  //mainQueries
};

const createEvents = (req, res) => {
  if (!req.body.bandID || !req.body.title || !req.body.date || !req.body.location || !req.body.startTime || !req.body.endTime ) {
    console.log(req.body);
    return res.send({ success: false, error: "fields missing for createEvents" });
  }

  //mainQueries
};


module.exports = { testRoute, searchEvents, createEvents };
