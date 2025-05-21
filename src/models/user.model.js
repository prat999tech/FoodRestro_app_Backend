 import mongoose from "mongoose";
 import jwt from "jsonwebtoken";
 import bcrypt from "bcrypt";
 const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        index:true,
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true

        },
        password:{
            type:true,
            required:[true,"password is required"]
        },
        avatar:{
            type:String,
            required:true
        },
        coverimage:{
            type:String,
        },
        refreshtoken:{
            type:String,
        },
        userorders:[
            {
            type:mongoose.Schema.Types.ObjectId,
            ref:"orders"
            }
        ],
          reviews:[
            { 
                type: mongoose.Schema.Types.ObjectId,
                 ref: 'Review'
             }
        ],


 },{timestamps:true})
 export const User = mongoose.model('User',userschema);