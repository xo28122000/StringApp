const express = require("express");
const isUser = require("../../helpers/middlewares/isUser");
const userController = require("../../controllers/userController/userController.js");

let userRouter = express.Router();

userRouter.post("/account", userController.account);

userRouter.put("/changeName", isUser, userController.changeName);

userRouter.put("/changePhone", isUser, userController.changePhone);

userRouter.put("/changeRole", isUser, userController.changeRole);

userRouter.post("/getEvent", userController.getEvent);

//is the below necessary?
//userRouter.post("/getEvent", searchEventsLimiter, userController.getBands);

module.exports = userRouter;
