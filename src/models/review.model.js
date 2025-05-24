import mongoose from "mongoose";

const reviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    restaurent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"restaurent",
    }
    
},{timestamp:true})
export const review=mongoose.model("review",reviewSchema);