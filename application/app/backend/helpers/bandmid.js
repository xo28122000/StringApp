//middleware tester
mockBandRouter.post(
  "/abc",
  (req, res, next) => {
    if (req.body.location) {
      try {
        const corr = getCordinates(req.body.location);
        req.body.latitude = corr.lat;
        req.body.longitude = corr.long;
        next();
      } catch (err) {
        res.send("failed to get geolocation");
      }
    } else {
      res.send("no location provided");
    }
  },

  (req, res) => {
    res.send("hey i reached here");
  }
);
const isUser = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send({ success: "false" });
  }
};

module.exports = { isUser };
