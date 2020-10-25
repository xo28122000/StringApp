const express = require("express");
const mockBandController = require("../../controllers/mockBandController/mockBandController");
let mockBandRouter = express.Router();

mockBandRouter.post("/createBand", mockBandController.createMockBand);
mockBandRouter.post("/searchBand", mockBandController.searchMockBand);

module.exports = mockBandRouter;
