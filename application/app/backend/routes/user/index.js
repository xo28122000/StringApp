const express = require("express");

let userRouter = express.Router();

userRouter.post("/register", (req, res) => {
  res.send({ message: "reached here" });
});

module.exports = userRouter;
