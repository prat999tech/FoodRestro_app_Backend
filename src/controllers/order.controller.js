import { Cart } from "../models/cart.model.js";
import { order} from "../models/order.model.js";
import { food} from "../models/food.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { apierror } from "../utils/apierror.js";
import { apiresponse} from "../utils/apiresponse.js";

const createorderfromcart=asyncHandler(async(req,res)=>{
    const userid=req.user._id;
    const cart=await Cart.find({userId:userid}).populate("items.foodId");
    if(!cart||cart.items.length==0){
        throw new apierror(400,"cart is empty")
    }
    const restaurentIds = [...new Set(cart.items.map(item => item.foodId.restaurent.toString()))];
    let totalquantity=0;
    let totalprice=0;
    let orderitem=[];
     cart.items.forEach(item => {
    totalamount += item.foodId.price * item.quantity;
    totalprice += item.foodId.price;
    totalquantity += item.quantity;
    orderitem.push(item.foodId._id);
  })
   const deliveryAddress = req.body.deliveryAddress || {};
const ordercreate= await order.create({
    userid,
    restaurent:restaurentIds,
    itemorder:orderitem,
    price:totalprice,
    quantity:totalquantity,
    deliveryAddress
})
cart.items=[];
await cart.save();
await ordercreate.save();
if(!ordercreate){
    throw new apierror(400,"order not created")
}
return res.status(200).json(
    new apiresponse(200,"oder created",ordercreate)
)


})
export{
    createorderfromcart
}
