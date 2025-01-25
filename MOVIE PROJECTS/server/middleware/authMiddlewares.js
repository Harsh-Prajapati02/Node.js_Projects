const jwt=require("jsonwebtoken")
require("dotenv").config()

const Auth=(req,res,next)=>{
   const {authToken}=req.cookies
   if(!authToken){
    return res.status(400).json({message:"login first !"})
   }
   jwt.verify(authToken,process.env.privateKey, function(err, decoded) {
    if(err){
        return res.status(400).json({message:err.message})
    }
    req.user=decoded.userdata
    next()
  });
}
module.exports=Auth