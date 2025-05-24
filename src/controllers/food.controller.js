import { restaurent } from "../models/restaurent.model.js";
import {apierror} from "../utils/apierror.js";
import { apiresponse } from "../utils/apiresponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { uploadoncloudinary } from "../utils/coudinary.js"
import mongoose from "mongoose"
import { food } from "../models/food.model.js";
const createfood=asyncHandler(async(req,res)=>{
     const { foodname, description, price, restaurent, isAvailabe, rating } = req.body;
     if(!foodname||!description||!price||!restaurent||!isAvailabe||rating){

        throw new apierror(404,"field is required");
     }

     coverImageLocalPath = req.files.coverimage[0].path;
     if(!coverImageLocalPath){
        throw new apierror(404,"cover image is required");
     }
     const uploadimage = await uploadoncloudinary(coverImageLocalPath);
     console.log("image is food uploading");
     const foodd=await food.create({
        foodname,
        description,
        price,
        restaurent,
        isAvailabe,
        rating,
        coverimage:uploadimage.url
     })
     const newfood=await foodd.save();
     if(!newfood){
        throw new apierror(404,"food is not created");
     }
     return res.status(200).json(
        new apiresponse(200,"food is created",newfood)
     )
})
const updatefooditem=asyncHandler(async(req,res)=>{
    const { foodname, description, price, restaurent, isAvailabe, rating }=req.body;
    const foodid=req.params.id;
    if(!foodid){
        throw new apierror(404,"food id is required");
    }
    if(!mongoose.Types.ObjectId.isValid(foodid)){
        throw new apierror(404,"invalid food id");
    }
    const realfoodid=await food.findById(foodid);
    if(!realfoodid){
        throw new apierror(404,"food is not found");
        }
        const foodupadte=await food.findByIdAndUpdate(foodid,
            {
                $set:{
            foodname,
            price,
            restaurent,
            isAvailabe
                }
            },
        
    {new:true})
    return res.status(200).json(
        new apiresponse(200,"food is updated",foodupadte)
    )
})
const getfoodbyrestaurent=asyncHandler(async(req,res)=>{
    const restaurentid=req.params.id;
    if(!restaurentid){
        throw new apierror(404,"restaurent id is required");
    }
    if(!mongoose.Types.ObjectId.isValid(restaurentid)){
        throw new apierror(404,"invalid restaurent id");
        }
        const food=await food.find({restaurent:restaurentid})
        if(!food){
            throw new apierror(404,"food is not found");
        }
        return res.status(200).json(
            new apiresponse(200,"food is found",food)
        )
        
})
const getfoodbyid=asyncHandler(async(req,res)=>{
    const {foodid}=req.params;
    if(!foodid){
        throw new apierror(404,"food id is required");
        }
        if(!mongoose.Types.ObjectId.isValid(foodid)){
            throw new apierror(404,"invalid food id");
            }
            const food=await food.findById(foodid);
            if(!food){
                throw new apierror(404,"food is not found");
                }
                return res.status(200).json(
                    new apiresponse(200,"food is found",food)
                    )

})
const deletefood=asyncHandler(async(req,res)=>{
    const {foodid}=req.params;
    if(!foodid){
        throw new apierror(404,"food id is required");
        }
        if(!mongoose.Types.ObjectId.isValid(foodid)){
            throw new apierror(404,"invalid food id");
            }
            const deletefood=await food.findByIdAndDelete(foodid);
            if(!deletefood){
                throw new apierror(400,"not found deletedfood",deletefood)
            }
            return res.status(200).json(
                new apiresponse(200,"food is deleted",deletefood)
                )

})

export{
    createfood,
    updatefooditem,
    getfoodbyrestaurent,
    getfoodbyid,
    deletefood
}