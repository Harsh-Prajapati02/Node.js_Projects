const express = require("express");
const { signUp, signIn } = require("../controllers/user.controllers");

const userRouter = express.Router();

// Sign Up
userRouter.post("/signup", signUp);

// Sign In
userRouter.post("/signin", signIn)

module.exports = userRouter;