import mongoose from "mongoose";
const foodschema=new mongoose.Schema({
    foodname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    coverimage:{
        type:String,
        required:true
    },
    restaurent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"restaurent"
    },
    isAvailabe: {
      type: Boolean,
      default: true,
    },
      rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },




},{timestamps:true})
export const food=mongoose.model("food",foodschema)