const express = require("express");
const userTestControllers = require("../../controllers/User/userTest");
let userRouter = express.Router();

userRouter.post("/test1", userTestControllers.testController1);
userRouter.post("/test2", userTestControllers.testController2);

module.exports = userRouter;
