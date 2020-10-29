const express = require("express");
const mockBand = require("./mockBand");

let mainRouter = express.Router();
mainRouter.use("/mockBand", mockBand);

module.exports = mainRouter;
