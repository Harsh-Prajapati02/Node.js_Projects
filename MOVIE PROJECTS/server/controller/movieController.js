const Moviesmodel = require("../model/movie.model")

const Create_movies=async(req,res)=>{
    const {Title,Genre,Director,ReleaseYear,Description}=req.body
    try {
        const data=await Moviesmodel.create({Title,Genre,Director,ReleaseYear,Description,userId:req.user._id})
        res.status(200).json({message:"data post successfully !",data})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
const Movies_Get=async(req,res)=>{
   try {
    const{userId}=req.params

    if(userId!=req.user._id){
        return res.status(400).json({message:"You are not authorized to get this blog"})
    }
    const data=await Moviesmodel.find({userId})
    if(!(data.length)>0){
        return res.status(400).json({message:"No blog found !"})
    }

    res.status(200).json({message:"data get successfully ! ",data})
   } catch (error) {
    res.status(400).josn({message:error.message})
   }
}
const Get_singlepage=async(req,res)=>{
    const {blogId}=req.params
   try {
      const isexist=await Moviesmodel.findById(blogId)
  
      if(!isexist){
         return res.status(400).json({message:"blog not found !"})
      }
      if(isexist.userId!=req.user._id){
         return res.status(400).json({message:"you have not permission to access the note "})
      }
      res.status(200).json({message:"notes access successfully",data:isexist})
   } catch (error) {
     
   }
  }
const update=async(req,res)=>{
   const {_id}=req.params
   try {
    const isexist=await Moviesmodel.findById(_id)
    if(!isexist){
        return res.status(400).json({message:"movie not found try ageain !"})
    }
        const data= await Moviesmodel.findByIdAndUpdate(_id,req.body,{new:true})
        res.status(200).json({message:"update successfully !",data})
    } catch (error) {
        res.status(400).json({message:error.message})   
    }
}
const deleteMovie=async(req,res)=>{
   const {userId}=req.params
    try {
        const isexist=await Moviesmodel.findById(userId)
        if(!isexist){
            return res.status(400).json({message:"movie not found try ageain !"})
        }
        const data=await Moviesmodel.findByIdAndDelete(userId)
        res.status(200).json({message:"movie delete successfully !",data})
    } catch (error) {
        res.status(400).json({message:error.message}) 
    }
}

module.exports={Create_movies,Movies_Get,update,deleteMovie,Get_singlepage}