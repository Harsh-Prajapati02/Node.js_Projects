const usermodel = require("../model/user.model")
const bcrypt=require("bcrypt");
var jwt = require('jsonwebtoken');
require("dotenv").config()
const  signup=async(req,res)=>{
    const {name,email,password}=req.body 
    if(!name||!email||!password){
    return    res.status(400).json({message:"fill all filled !"})
    }
    if(req.body.role){
      return  res.status({message:"user can not send role !"})
    }
    
  try {
    const isEsixt=await usermodel.findOne({email})
    if(isEsixt){
      return  res.status(400).json({ message: "User with this email already exists!" });
    }
    
    
    bcrypt.hash(password,5,async(err,hash)=>{
        if(err){
            return res.status(400).json({message:"error is hashing password"})
        }
        const data=await usermodel.create({email,name,password:hash}) 
        res.status(200).json({message:"user created suceessully !", data})
    })
    
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}
const signIn=async(req,res)=>{
  const {email,password}=req.body 
  if(!email||!password){
    return res.status(400).json({message:"please fill in all"})
  }
  const isuserexist=await usermodel.findOne({email})
  if(!isuserexist){
    return res.status(400).json({message:"please signup !"})
  }
  bcrypt.compare(password,isuserexist.password, function(err, result) {
    if(err){
        return res.status(400).json({message:"error while creating token "})
    }
    if(result){
        const {password,...rest}=isuserexist._doc
        jwt.sign({userdata:rest}, process.env.privateKey,function(err, token) {
            if(err){
                return   res.status(400).json({message:"error while creating token "})
            }
            res.cookie("authToken",token)
            res.status(200).json({message:"user created successfully !",userdata:rest})
          });
    }
    else{
        return res.status(400).json({message:"password is incorrect "})
    }
});
}
module.exports={signup,signIn}