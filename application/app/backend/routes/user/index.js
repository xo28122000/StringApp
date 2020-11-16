const express = require("express");

const userController = require("../../controllers/userController/userController.js");

let userRouter = express.Router();

userRouter.post("/getEvent", userController.getEvent);

userRouter.post("/account", userController.account);

//is the below necessary?
//userRouter.post("/getEvent", searchEventsLimiter, userController.getBands);

module.exports = userRouter;
