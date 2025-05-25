import { asyncHandler } from "../utils/asynchandler.js";
import { apierror } from "../utils/apierror.js";
import { apiresponse } from "../utils/apiresponse.js";
import { Cart } from "../models/cart.model.js";


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
const deleteitemfromcart=asyncHandler(async(req,res)=>{
    const userid=req.user._id;
    const {foodid}=req.params;
    const cart=await Cart.findOne({userId:userid});
    if(!cart){
        throw new apierror(400,"cart not found")
    }
    const itemindex=cart.items.findIndex(i=>i.foodId.equals(foodid))
    if(itemindex==-1){
        throw new apierror(400,"item not found in cart")
    }
    const deleteditem=cart.items.splice(itemindex,1);
    await cart.save();
    return res.status(200).json(
        new apiresponse(200,"item deleted from cart",deleteditem)
        
      //The 1 tells splice to remove exactly one item at the specified index.
     //If you used 2, it would remove two items starting from that index.
    )
})
const updateitemincart=asyncHandler(async(req,res)=>{
    const userid=req.user._id;
    const {foodid}=req.params;
    const {quantity}=req.body;
    const cart=await Cart.findOne({userId:userid});
    if(!cart){
        throw new apierror(400,"cart not found")
        }
        const item=cart.items.find(i=>i.foodId.equals(foodid));
        if(item){
            item.quantity=+quantity;
        }
        else{
                cart.items.push({ foodId: foodid, quantity: +quantity });
        }
         await cart.save();

         return res.status(200).json(
            new apiresponse(200,"item updated in cart",cart)
            )

})
export{
    additemsincart,
    deleteitemfromcart,
    updateitemincart
}



