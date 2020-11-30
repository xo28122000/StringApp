//should run the location library and then
//change the req.body.lat, req.body.long to what the function returns
//everything gets done in here
const nodeGeocoder = require("node-geocoder");

const geoCoder = nodeGeocoder({
  provider: "openstreetmap",
});

const geocode = async (req, res, next) => {
  if (req.body.location) {
    try {
      const retObj = await geoCoder.geocode({
        street: req.body.location.street,
        city: req.body.location.city,
        state: req.body.location.state,
        postalcode: req.body.location.zip,
        country: "United States",
      });
      if (retObj.length > 0) {
        req.body.locationLat = retObj[0].latitude;
        req.body.locationLong = retObj[0].longitude;
      }

      next();
    } catch (err) {
      return res.send({ success: false, error: "geolocation error" });
    }
  } else {
    next();
  }
  // else {
  //   return res.send({
  //     success: false,
  //     error: "no location provided by user",
  //   });
  // }
};

/** //this is the old version
const geocode = async (req, res, next) => {
  if (req.body.location) {
    try {
      const retObj = await geoCoder.geocode({
        address: req.body.location.street,
        city: req.body.location.city,
        state: req.body.location.state,
        zipcode: req.body.location.zip,
        country: "United States",
      });
      req.body.latitude = retObj[0].latitude;
      req.body.longitude = retObj[0].longitude;
      next();
    } catch (err) {
      return res.send({ success: false, error: "geolocation error" });
    }
  } else {
    return res.send({ success: false, error: "no location provided by user" });
  }
};
*/

module.exports = geocode;
