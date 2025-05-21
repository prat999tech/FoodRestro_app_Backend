import {User} from "../models//user.model.js"
import { apiresponse} from "../utils/apiresponse.js"
import { apierror} from "../utils/apierror.js"
import { order } from "../models/order.model.js"
import { asyncHandler} from "../utils/asynchandler.js"
import { uploadoncloudinary } from "../utils/coudinary"
import jwt from "jsonwebtoken"
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
    const createduser=User.findById(user._id).select("-password -refreshtoken")
    if(!createduser){
        throw new apierror(404,"user not found")
    }
    return res.status(200).json(
        apiresponse(200, "User created successfully", createduser)
    )


})
