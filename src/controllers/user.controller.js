import {User} from "../models//user.model.js"
import { apiresponse} from "../utils/apiresponse.js"
import { apierror} from "../utils/apierror.js"
import { order } from "../models/order.model.js"
import { asyncHandler} from "../utils/asynchandler.js"
import { uploadoncloudinary } from "../utils/coudinary.js"
import jwt from "jsonwebtoken"
import { sendEmail } from "../service/email.js"
const generateaccessandrefreshtoken=async(Userid)=>{
    try{
        const user=User.findById(Userid)
        const accesstoken=await user.generateAccessToken()
        const refreshtoken=await user.generateRefreshToken()
        user.refreshtoken=refreshtoken;
        return {accesstoken,refreshtoken}
    }catch(error){
        console.error(error,"error occurred at genrating access token");
        throw new apierror(404,"error occurred")
    }

}
const registeruser=asyncHandler(async(req,res)=>{
    const{fullname,username,email,password}=req.body;
    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        console.log("Validation failed: Fields are empty."); // Log validation failure
        throw new apierror(400, "All fields are required");
    }
    const existeduser=User.findOne(
        {
            $or:[{username},{email}]
        }
    )
    if(existeduser){
        console.log("user existed");
        
        throw new apierror(400,"username or email already exist")
    }
    console.log("req.files object:", req.files); // Log the entire req.files object from Multer
    const avatarlocalpath=req.files?.avatar[0]?.path;
    if(!avatarlocalpath){
        throw new apierror(400,"upload avatar")
    }
    const coverimagelocalpath=req.files?.coverimage[0]?.path;
    if(!coverimagelocalpath){
        throw new apierror(400,"upload cover image")
    }
    const avatar=await uploadoncloudinary(avatarlocalpath);
    const coverimage=await uploadoncloudinary(coverimagelocalpath);
    const user=await new User.create({
        fullname,
        avatar:avatar.url,
        coverimage:coverimage.url,
        email,
        username:username.toLowerCase()
    })
    await user.save();
    await sendEmail(user.email,user.fullname);
    const createduser=User.findById(user._id).select("-password -refreshtoken")
    if(!createduser){
        throw new apierror(404,"user not found")
    }
    return res.status(200).json(
        apiresponse(200, "User created successfully", createduser)
    )


})
const loginUser=asyncHandler(async(req,res)=>{
    const{username,email,password}=req.body
   if (!username && !email){
        throw new apierror(400,"username or email is required");
    }
    const user=User.find(
        {
            $or:[{username},{email}]
        }
    )
    
    if(!user){
        throw new apierror(404,"user not found")
    }
     const isPasswordValid=await user.isPasswordCorrect(password)
     if(!isPasswordValid){
        throw new apierror(401,"invalid password")

     }
     const {accesstoken,refreshtoken}=generateaccessandrefreshtoken(user._id);
     const loggedInuser=User.findById(user._id).select("-password -refreshtoken")
     const options={
        httpOnly:true,
        secure:true,
       }
       return res.status(200).cookie("refresh token",refreshtoken,options).cookie("access token",accesstoken,options).
       json(new apiresponse(200,loggedInuser,"user logged in "))

})
const logoutuser=asyncHandler(async(req,res)=>{
    const user=User.findByIdAndUpdate(req.user._id,
        {
            $set:{
                refreshtoken:undefined
            }
        }
    )
    const options={
        httpOnly:true,
        secure:true,
    }
    return res.status(200).clearcookie("accesstoken",accesstoken,options).clearcookie("refreshtoken",refreshtoken,options).
    json(new apiresponse(200,user,"user logged out"))
})
const refreshaccesstoken=asyncHandler(async(req,res)=>{
    const incomingrefreshtoken=req.cookies.refreshtoken || req.body.refreshtoken;
    if(!incomingrefreshtoken){
        throw new apierror(404,"refreshtoken is required");
        
    }
    const decodedtoken=jwt.verify(incomingrefreshtoken,process.env.REFRESH_TOKEN_SECRET);
    const user=await User.findById(decodedtoken?.id).select("-password");
    if(!user){
        throw new apierror(401,"user not found");
    }
     if(incomingrefreshtoken!=user.refreshtoken){
            throw new apierror(401,"refresh token expired or user expired")
        }
        const options={
            httpOnly:true,
            secure:true
        }
        const {accesstoken,newrefreshtoken}=generateaccessandrefreshtoken(user._id)
         return res
        .status(200)
        .cookie("accesstoken",accesstoken,options)
        .cookie("refreshtoken",newrefreshtoken,options)
        .json(
            new apiresponse(
                200,
                {accesstoken,refreshtoken:newrefreshtoken},
                "Access token refreshed"
            )
        )
})
const changepassword=asyncHandler(async(req,res)=>{
    const {oldpassword,newpassword}=req.body;
    const user=await User.findById(req.user._id);
    const ismatch=await user.isPasswordCorrect(oldpassword);
    if(!ismatch){
        throw new apierror(401,"old password is incorrect");
    }
    user.password=newpassword;
     await user.save({validateBeforeSave:false})
    return res.status(200).json(
        new apiresponse(200,user,"password changed")
    )

})
const getuserdetails=asyncHandler(async(req,res)=>{

    
    const user=await User.findById(req.user._id).select("-password");
    return res.status(200).json(
        new apiresponse(200,user,"user details")
    )

})
const updateaccountdetails=asyncHandler(async(req,res)=>{
    const{username,email,fullname}=req.body;
    if(!username){
        throw new apierror(400,"username is required");
    }
    const updateuser=await User.findByIdAndUpdate(req.user._id,
        {
            $set:{
                username:username,
                email:email,
                fullname:fullname
            }
        },
        {
            new:true
        }
    )
    return res.status(200).json(
        new apiresponse(200,updateuser,"account details updated")
    )
})
const updateavatar=asyncHandler(async(req,res)=>{
    const avatarlocalpath=req.files.path;
     if(!avatarlocalpath){
        throw new apierror(400,"avatar is required");
    }
    const avatar=await uploadoncloudinary(avatarlocalpath)
    if(!avatar.url){
        throw new apierror(400,"avatar upload failed")
    }
    const updateuser=await User.findByIdAndUpdate(req.user._id,
        {
            $set:{
                avatar:avatar.url
            }
        },
        {
            new:true
        }
    )
    return res.status(200).json(
        new apiresponse(200,updateuser,"avatar updated")
    )
})
const updatecoverimage=asyncHandler(async(req,res)=>{
    const coverlocalpath=req.files.path;
    if(!coverlocalpath){
        throw new apierror(400,"cover image is required");
        }
        const cover=await uploadoncloudinary(coverlocalpath)
        if(!cover.url){
            throw new apierror(400,"cover image upload failed")
        }
        const updateuser=await User.findByIdAndUpdate(req.user._id,
            {
                $set:{
                    cover:cover.url
                }
            },
            {
                new:true
            }
        )
        return res.status(200).json(
            new apiresponse(200,updateuser,"cover image updated")
            )
})

const getuserorder=asyncHandler(async(req,res)=>{
    const userid=req.query;
    const user=await User.findById(userid);
    if(!user){
        throw new apierror(404,"user not found")
    }
    const userorder=await order.find({
        customerid:userid
    }).sort({createdAt:-1})
    .populate({
        path:"itemorder",
        model:"food"

    })
    .populate({
        path:"paymentid",
        model:"payment"
    })
    return res.status(200).json(
        new apiresponse(200,userorder,"user order")
    )

})

export{
    registeruser,
    loginUser,
    logoutuser,
    refreshaccesstoken,
    changepassword,
    getuserdetails,
    updateavatar,
    updatecoverimage,
    updateaccountdetails,
    getuserorder
}
