import mongoose from "mongoose"
const paymentschema= new mongoose.Schema({
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"order"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    amount:{
        type:Number,
        required:true
    },
    paymentmethod:{
         type:String,
         required:true
    },
    transactionid:{
        type:String
    },
    paymentdate:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        enum:["pending","success","failed"],
        default:"pending"
    },
    paymentprovider:{
        type:String

    }

},{timestamps:true})
export const payment=mongoose.model("payment",paymentschema)