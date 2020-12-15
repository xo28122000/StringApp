const express = require("express");
const isUser = require("../../helpers/middlewares/isUser");
const userController = require("../../controllers/userController/userController.js");

let userRouter = express.Router();

//route definition for displaying a logged in user's account information
userRouter.post("/account", userController.account);

//route definition for changing a logged in user's account name
userRouter.put("/changeName", isUser, userController.changeName);

//route definition for changing a logged in user's account phone number
userRouter.put("/changePhone", isUser, userController.changePhone);

//route definition for changing a logged in user's defined account role
userRouter.put("/changeRole", isUser, userController.changeRole);

//TODO this should probably be in band - change this?
userRouter.post("/getEvent", userController.getEvent);

//is the below necessary?
//userRouter.post("/getEvent", searchEventsLimiter, userController.getBands);

module.exports = userRouter;
