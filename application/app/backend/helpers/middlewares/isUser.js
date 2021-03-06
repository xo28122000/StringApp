//middleware function
//verifies if user is a logged in, registered user
const isUser = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send({ success: false, error: "user not logged in" });
  }
};

module.exports = isUser;
