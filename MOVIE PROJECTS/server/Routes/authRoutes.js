const express=require("express")
const { signup, signIn } = require("../controller/authController")
const Auth = require("../middleware/authMiddlewares")

const AuthRoutes=express.Router()

AuthRoutes.post("/register",signup)
AuthRoutes.post("/login",signIn)
module.exports=AuthRoutes