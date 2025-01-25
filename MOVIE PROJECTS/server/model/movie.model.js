const mongoose=require("mongoose")

const MoviesSchema=new mongoose.Schema({
    Title:String,
    Genre:String,
    Director:String,
    ReleaseYear:Number,
    Description:String,
    userId:String
})
const Moviesmodel=mongoose.model("movies",MoviesSchema)
module.exports=Moviesmodel