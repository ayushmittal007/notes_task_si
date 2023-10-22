const express = require("express");
const authRouter = express.Router();
const { User } = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authController = require("../controllers/authController");

authRouter.post("/sign-up", authController.sign_up);
authRouter.post("/log-in", authController.log_in);
authRouter.get("/",authController.auth,authController.get_user);

module.exports = authRouter;