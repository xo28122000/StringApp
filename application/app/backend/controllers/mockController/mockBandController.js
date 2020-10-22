const mockBandQuerries = require("../../db/queries/mockUser"); //semicolon needed? TODO

const createMockBand = (req, res) => {
  mockBandQuerries
    .createBand(req.body.name, req.body.type, imageUrl) //TODO create s3 bucket?
    .then(() => {
      res.send("Success: True"); //TODO quotation marks?
    }) //if success
    .catch((err) => {
      res.send("Success: False"); //TODO quotation marks?
    }); //if fail
  //req.body.name; not needed?
  //req.body.typeOfMusic; not needed?
  res.send("createMockBand here");
};

const searchMockBand = (req, res) => {
  res.send("searchMockBand here");
};

module.exports = { createMockBand, searchMockBand };
