//should run the location library and then
//change the req.body.lat, req.body.long to what the function returns
//everything gets done in here
let nodeGeocoder = require("node-geocoder");

let options = {
  provider: "openstreetmap",
};

let geoCoder = nodeGeocoder(options);

var inputLocation = "1600 Pennsylvania Avenue, Washington DC"; //for amusement

const geocode = (req, res, next) => {
  if (req.location) {
    inputLocation = req.location;
    try {
      const coordinates = geoCoder.geocode(inputLocation);
      req.body.latitude = coordinates.latitude;
      req.body.longitude = coordinates.longitude;
      next();
    } catch (err) {
      res.send("geolocation error");
    }
  } else {
    res.send({ success: "false" }, "no location provided by user");
  }
};

module.exports = { geocode };
