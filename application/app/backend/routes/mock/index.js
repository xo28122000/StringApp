const express = require("express");
const mockBandController = require("../../controllers/mockController/mockBandController");
const userTestControllers = require("../../controllers/User/userTest");
let mockRouter = express.Router();

mockRouter.post("/createBand", mockBandController.createMockBand);
mockRouter.post("/searchBand", mockBandController.searchMockBand);

module.exports = mockRouter;
