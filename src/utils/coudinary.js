import {v2 as cloudinary} from "cloudinary"
//import { log } from "console";
import fs from "fs" //this hepls in file manupulation
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
  const uploadoncloudinary=async(localfilepath)=>{
    try{
        if(!localfilepath){
            return null;
        }
        const file=await cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto"
        })
    }catch(error){
        console.error(error);
        fs.unlink(localfilepath)
        
    }
  }
  export {uploadoncloudinary}