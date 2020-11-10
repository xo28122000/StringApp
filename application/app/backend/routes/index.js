const express = require("express");

const authRouter = require("./auth");
const band = require("./band");
const user = require("./user");

let mainRouter = express.Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/band", band);
mainRouter.use("/user", user);

module.exports = mainRouter;
