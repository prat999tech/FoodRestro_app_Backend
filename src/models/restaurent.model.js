import mongoose from "mongoose"
const restaurentschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true

    },
    menu:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"food"
    }
     ],
    rating:{
        type:Number,
        default:0
    },
    reviews:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"review"
    },
    pickup: {
      type: Boolean,
      default: true,
    },
     delivery: {
      type: Boolean,
      default: true,
    },
     isOpen: {
      type: Boolean,
      default: true,
    },
    coverimage:{
        type:String
    },
   address:{
    line1:{
        type:String
    },
    line2:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    zip:{
        type:Number
    },

   },

},{timestamps:true})

 export const restaurent = mongoose.model('restaurant',restaurentschema);