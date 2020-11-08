const isUser = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send({ success: false });
  }
};

module.exports = isUser;
