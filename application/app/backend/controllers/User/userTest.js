const testController1 = (req, res) => {
  res.send("testController1 here");
};

const testController2 = (req, res) => {
  res.send("testController2 here");
};

module.exports = { testController1, testController2 };
