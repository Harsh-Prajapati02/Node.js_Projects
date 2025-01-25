const express=require("express")
const { Movies_Get, Create_movies, update, deleteMovie, Get_singlepage } = require("../controller/movieController")
const Auth = require("../middleware/authMiddlewares")
const MoviesRoutes=express.Router()

 MoviesRoutes.get("/movies/:userId",Auth,Movies_Get)
 MoviesRoutes.post("/create",Auth,Create_movies)
 MoviesRoutes.put("/update/:_id",Auth,update)
 MoviesRoutes.delete("/delete/:userId",Auth,deleteMovie)
 MoviesRoutes.get("/shingldata/:blogId",Auth,Get_singlepage)
 module.exports=MoviesRoutes
