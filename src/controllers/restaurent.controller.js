import { restaurent } from "../models/restaurent.model.js";
import {apierror} from "../utils/apierror.js";
import { apiresponse } from "../utils/apiresponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { uploadoncloudinary } from "../utils/coudinary.js"
import mongoose from "mongoose"
import {review} from "../models/review.model.js"


const createrestaurent=asyncHandler(async(req,res)=>{
            const { name, email, menu, rating, reviews, pickup, delivery, isOpen, address } = req.body;
                    coverImageLocalPath = req.files.coverImage[0].path;
                    if(!coverImageCloudinaryPath){
                        throw new apierror(400,"not getting coverimage of restaurent")
                    }
                    console.log("uploading coverimage");
                    
                    coverImageCloudinaryPath = await uploadoncloudinary(coverImageLocalPath);
                    console.log("coverimage uploaded");
                    const restaurent = new restaurent({
                        name,
                        email,
                        menu,
                        rating,
                        reviews,
                        pickup,
                        delivery,
                        isOpen,
                        address,
                        coverImage:coverImageCloudinaryPath.url
                    })
                    const savedrestaurent = await restaurent.save();
                    return res.status(200).json(
                       new apiresponse(200, "restaurent created successfully", savedrestaurent)
                    )

})
const updaterestaurentdetails=asyncHandler(async(req,res)=>{
    const restaurentid=req.params;
    const{pickup,delivery,isOpen}=req.body;
    if(!restaurentid){
        throw new apierror(400,"restaurent id is required")
    }
    if(!mongoose.Types.ObjectId.isValid(restaurentid)){
        throw new apierror(400,"invalid restaurent id")
    }
    const restro=await restaurent.findByIdAndUpdate(restaurentid,
        {
           $set:{
            pickup:pickup,
            delivery:delivery,
            isOpen:isOpen
           }

        },
        {new:true}
    )
    return res.status(200).json(
        new apiresponse(200,"restaurent details updated successfully",restro)
    )
})
const getrestrodetails=asyncHandler(async(req,res)=>{
    const restaurentid=req.params;
    if(!restaurentid){
        throw new apierror(400,"restaurent id is required")
        }
        if(!mongoose.Types.ObjectId.isValid(restaurentid)){
            throw new apierror(400,"invalid restaurent id")
            }
            const restro=await restaurent.findById(restaurentid).populate("menu")
              if (!restro) {
             throw new apierror(404, "restaurent not found");
             }
            return res.status(200).json(
                new apiresponse(200,"restaurent details fetched successfully",restro)
                )

})
const getallreviews=asyncHandler(async(req,res)=>{
    const restaurentid=req.params;
    if(!restaurentid){
        throw new apierror(400,"restaurent id is required")
        }
        if(!mongoose.Types.ObjectId.isValid(restaurentid)){
                throw new apierror(400,"restaurent id is invalid")
        }
        const restroaggregate=review.aggregate([
            {
            $match:{
                restaurent:new mongoose.Types.ObjectId(restaurentid)

            }
        },
        {
            $lookup:{
                from:"users",//mongodb all name is in lowercase and plural
                localfield:"user",
                foreignfield:"_id",
                as:"userdetails"
            }
        },
        {
            $unwind:"userdetails"
        },
        
            {
                $project:
                {
                    _id:1,
                    createdAt: 1,
                 "userdetails._id": 1,
                 "userdetails.username": 1,
                 "userdetails.email": 1,
                  "userdetails.avatar": 1
                }
            },
            {
                $sort:{creadtedAt:-1}
            }
        
        
    ]);
    return res.status(200).json(
        new apiresponse(200,"reviews fetched successfully",restroaggregate)
    )

}) 
const getmenuofrestaurent=asyncHandler(async(req,res)=>{
    const restaurentid=req.params.restaurentid;
    if(!restaurentid){
        throw new apierror(400,"restaurent id is required")
    }
    if(!mongoose.Types.ObjectId.isValid(restaurentid)){
        throw new apierror(400,"restaurent id is invalid")
    }
    const menu=await food.aggregate([ // i can do it using .find() also
        {
            $match:{
                restaurent:new mongoose.Types.ObjectId(restaurentid)
            }
        },
        {
            sort:({createdAt:-1})
        }
    ])
    return res.status(200).json(
        new apiresponse(200,"menu fetched successfully",menu)
    )
    
})


export{
    createrestaurent,
    updaterestaurentdetails,
    getrestrodetails,
    getallreviews,
    getmenuofrestaurent

}
