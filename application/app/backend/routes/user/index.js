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

//route definition for adding a link to a user profile
userRouter.post("/createLink", isUser, userController.createLink);

//route definition for getting all the bands of a user and its related information
userRouter.post("/getUserBand", isUser, userController.getUserBand);

//route definition for editing all the user related information
userRouter.post("/editUserInfo", isUser, userController.editUserInfo);

//route definition for deleting a link from a user profile
userRouter.post("/deleteLink", isUser, userController.deleteLink);

//TODO this should probably be in band - change this?
userRouter.post("/getEvent", userController.getEvent);

//route definition for sending an invite from a logged in user
userRouter.post("/sendInvite", isUser, userController.sendInvite);

//is the below necessary?
//userRouter.post("/getEvent", searchEventsLimiter, userController.getBands);

module.exports = userRouter;
