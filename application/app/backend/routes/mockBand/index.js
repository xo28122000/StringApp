const express = require("express");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: "backend/uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const rateLimit = require("express-rate-limit");
const createMockBandLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 15, // start blocking after 5 requests
  message: {
    success: false,
    error: "try again after an hour",
  },
});
const searchMockBandLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 100, // start blocking after 5 requests
  message: {
    success: false,
    error: "try again after an hour",
  },
});

const mockBandController = require("../../controllers/mockBandController/mockBandController");
let mockBandRouter = express.Router();

mockBandRouter.post(
  "/createBand",
  createMockBandLimiter,
  upload.single("imageFile"),
  mockBandController.createMockBand
);

mockBandRouter.post(
  "/searchBand",
  searchMockBandLimiter,
  mockBandController.searchMockBand
);

mockBandRouter.post("/testRoute", mockBandController.testRoute);

module.exports = mockBandRouter;
