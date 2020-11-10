const express = require("express");

const authRouter = require("./auth");
const bandRouter = require("./band");
const userRouter = require("./user");

let mainRouter = express.Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/band", bandRouter);
mainRouter.use("/user", userRouter);

module.exports = mainRouter;
