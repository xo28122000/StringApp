const mockBandQuerries = require("../../db/queries/mockBand");

const createMockBand = (req, res) => {
  if (!req.body.name || !req.body.type || !req.body.numMembers) {
    return res.send({ success: false, error: "fields missing" });
  }
  //TODO create s3 bucket and get url
  var url = "url";
  mockBandQuerries
    .createBand(req.body.name, req.body.type, req.body.numMembers, url)
    .then(() => {
      return res.send({ success: true });
    })
    .catch(err => {
      console.log(err);
      return res.send({ success: false, error: "internal error" });
    });
};

const searchMockBand = (req, res) => {
  mockBandQuerries
    .searchBand(null, null, null)
    .then(retObj => {
      return res.send({ success: true, result: retObj });
    })
    .catch(err => {
      return res.send({ success: false, error: "internal error" });
    });
};

module.exports = { createMockBand, searchMockBand };
