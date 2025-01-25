const express=require("express")
const mongoose =require("mongoose")
const AuthRoutes = require("./Routes/authRoutes")
const cors=require("cors")
const cookieParser = require("cookie-parser");
const MoviesRoutes = require("./Routes/MoviesRoutes");
require("dotenv").config()
const app=express()
app.use(express.json())
app.use(cookieParser()); 
app.use(cors({origin: ["http://localhost:5173","http://localhost:5174","http://localhost:5175"], 
    credentials: true}))
app.use("/user",AuthRoutes)
app.use("/movie",MoviesRoutes)
app.listen(process.env.PORT,async()=>{
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log(`mongodb connected on port is : ${process.env.PORT}`)
    } catch (error) {
        console.log("data base not connected !")
    }
})