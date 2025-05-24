import mongoose from "mongoose";

const orderschema= new mongoose.Schema({
    customerid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    restaurent:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"restaurent"
    }
  ],


    
    itemorder:[
        {
          
            type:mongoose.Schema.Types.ObjectId,
            ref:"food",
            required:true
        },
        
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

