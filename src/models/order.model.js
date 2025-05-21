import mongoose from "mongoose";

const orderschema= new mongoose.Schema({
    customername:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    itemorder:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"food"
        }
    ],
     status: {
      type: String,
      enum: ["preparing", "prepare", "on the way", "deliverd"],
      default: "preparing",
    },
      paymentId:                
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'payment' 
    },
    totalamount:{
        type:Number,
        requires:true,
    },
    price:{
        type:Number,
        requires:true,
    },
    quantity:{
        type:Number,
        required:true

    },
      deliveryAddress: {
    line1: { type: String },
    line2:          { type: String },
    city:           { type: String },
    state:          { type: String },
    zip:            { type: String },
    country:        { type: String }
  },


},{timestamps:true})
 export const order = mongoose.model('order',orderschema);

