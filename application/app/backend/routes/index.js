const express = require("express");

const mockBand = require("./mockBand");
const authRouter = require("./auth");
const main = require("./main");

let mainRouter = express.Router();
mainRouter.use("/mockBand", mockBand);
mainRouter.use("/auth", authRouter);
mainRouter.use("/main", main);

module.exports = mainRouter;
