const bandQueries = require("../../db/queries/band.js");

//internal helper function as middleware for verification if
//the user is the Band Admin of a given band or not
const isBandAdmin = async (req, res, next) => {
  //console.log("called inside isMember");
  if (!req.body.bandId) {
    console.log("bandId field missing");
  } else if (!req.user) {
    //console.log("Must be a logged in user to proceed.");
  }

  let member = await bandQueries.isBandAdmin(req.user.userId, req.body.bandId);
  //console.log("member: " + JSON.stringify(member));

  let numMembers = 0;

  for (var key in member[0]) {
    //console.log("Key: " + key);
    //console.log("Value: " + member[0][key]);
    numMembers = member[0][key];
  }

  //   console.log("numMember: " + numMembers);

  if (numMembers == 1) {
    // console.log("isMember is returning true");
    next();
  } else {
    // console.log("isMember is returning false");
    //console.log("member: " + JSON.stringify(member));
  }
};

module.exports = isBandAdmin;
