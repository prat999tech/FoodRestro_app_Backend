import {razorpay} from "razorpay";
import dotenv from 'dotenv';
dotenv.config({ path: './env' });
const razorpayistance=new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})
export {razorpayistance}