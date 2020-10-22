const express = require("express");
const userRouter = require("./user");

let mainRouter = express.Router();
mainRouter.use("/user", userRouter);

module.exports = mainRouter;

const mockRouter = require("./mock");
mainRouter.use("/mock", mockRouter);
