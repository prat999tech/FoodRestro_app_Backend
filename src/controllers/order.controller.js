import { Cart } from "../models/cart.model.js";
import { order} from "../models/order.model.js";
import { food} from "../models/food.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { apierror } from "../utils/apierror.js";
import { apiresponse} from "../utils/apiresponse.js";
import { cancelorderemail } from "../service/email.service.js";
import { User } from "../models/user.model.js";

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
    //totalamount += item.foodId.price * item.quantity;
    totalprice += item.foodId.price*item.quantity;
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
    new apiresponse(200,"order created",ordercreate)
)


})
const getorderbyuser=asyncHandler(async(req,res)=>{
    const userid=req.user._id;
    const orders=await order.find({customerid:userid}).populate("itemorder").populate("paymentId").populate("restaurant");
    if(!orders||orders.length==0){
        throw new apierror(400,"order not found")
    }
    return res.status(200).json(
        new apiresponse(200,"order found",orders)
    )
})
const getorderbyid=asyncHandler(async(req,res)=>{
    const orderid=req.params.orderid;
    if(!mongoose.Types.ObjectId.isValid(orderid)){
        throw new apierror(400,"invalid order id")
    }
    const order=await order.findById(orderid).populate("itemorder").populate("paymentId").
    populate("restaurant");
    return res.status(200).json(
        new apiresponse(200,"order found",order)
    )


})
const cancelorder=asyncHandler(async(req,res)=>{
const { orderid } = req.params;
const userid=req.user._id;
const user=await User.findById(userid);
if(!user){
    throw new apierror(400,"user not found")
}

  
  const orderDoc = await orderrder.findById(orderid);
  if (!orderDoc) {
    throw new apierror(404, "Order not found");
  }

  
  if (orderDoc.status === "delivered" || orderDoc.status === "deliverd") {
    return res.status(400).json(new apiresponse(400, "Order is already delivered"));
  }

  
  orderDoc.status = "Cancelled"; 
  await orderDoc.save();
      await cancelorderemail(user.email,user.fullname);
  


  return res.status(200).json(new apiresponse(200, "Order marked as delivered", orderDoc));    
})

export{
    createorderfromcart,
    getorderbyuser,
    getorderbyid,
    cancelorder


}