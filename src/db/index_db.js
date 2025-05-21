import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: './env' });
const connectDB=async()=>{
    try{
        const connectioninstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
         console.log(`\n MongoDB connected !! DB HOST: ${connectioninstance.connection.host}`);
    }catch(error){
        console.error(error);
        process.exit(1);
    }
}
export default connectDB;
