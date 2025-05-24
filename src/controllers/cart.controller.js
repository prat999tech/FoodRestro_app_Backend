import { asyncHandler } from "../utils/asynchandler.js";
import { apierror } from "../utils/apierror.js";
import { apiresponse } from "../utils/apiresponse.js";
import mongoose from "mongoose";
import { Cart } from "../models/cart.model.js";
import { order } from "../models/order.model.js";
import { food } from "../models/food.model.js";


const additemsincart=asyncHandler(async(req,res)=>{
    const {foodid,quantity}=req.body;
    const userid=req.user._id;
    const food=await food.findById(foodid);
    if(!food) {
        throw new apierror(200,"foodid invalid")
    }
    const cart=await Cart.findById({userId:userid})
    if(!cart){
        cart=await Cart.create({
            userId:userid,
            items:[
                {
                    foodId:foodid,
                    quantity:quantity
                }
            ]
        })
    }
    else{
        const item= cart.items.find(i => i.foodId.equals(foodid))
        if(item){
            item.quantity+=quantity
        }
        else{
            cart.items.push({ foodid, quantity });
        }
    }
    const createdcart=await cart.save();
    return res.status(200).json(
        new apiresponse(200,"item added to cart",createdcart)
    )
        
})
export{
    additemsincart
}



