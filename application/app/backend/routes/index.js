const express = require("express");
const mockBand = require("./mockBand");
const authRouter = require("./auth");

let mainRouter = express.Router();
mainRouter.use("/mockBand", mockBand);
mainRouter.use("/auth", authRouter);

module.exports = mainRouter;
