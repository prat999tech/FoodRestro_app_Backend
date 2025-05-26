import { order } from "../models/order.model.js";
import { razorpayistance } from "../service/razorpay.service.js";
import {apierror} from "../utils/apierror.js";
import { apiresponse } from "../utils/apiresponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { paymentconfiremed } from "../service/email.service.js";
import { User } from "../models/user.model.js";
import { payment as Payment } from "../models/payments.model.js";

const createpayment=asyncHandler(async(req,res)=>{
    const {orderid}=req.body;
    const orders=await order.findById(orderid);
    if(!orders) {
        throw new apierror(res,400,"Order not found");
        }
         const options = {
    amount: orders.totalamount * 100, // Amount in paise
    currency: "INR",
    receipt: orderid,
    payment_capture: 1,
  };
  const razorpay = await razorpayistance.orders.create(options);
  return res.status(200).json(
    new apiresponse(200,"payment link generated",razorpay)

  )
})
const verifypayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderid // Your own order ID (optional, for DB update)
  } = req.body;

  // 1. Verify signature
  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    throw new apierror(400, "Payment verification failed");
  }

  // 2. Update payment record (if you have one)
  const paymentDoc = await Payment.findOneAndUpdate(
    { transactionid: razorpay_order_id },
    {
      status: "success",
      paymentdate: new Date(),
      transactionid: razorpay_payment_id
    },
    { new: true }
  );

  // 3. Update order status
  const orderDoc = await order.findByIdAndUpdate(
    orderid,
    { status: "preparing" },
    { new: true }
  );

  // 4. Send email notification (optional)
  if (orderDoc) {
    const user = await User.findById(orderDoc.customerid);
    if (user) {
      await paymentconfiremed(user.email,user.fullname)
    }
  }

  return res.status(200).json(
    new apiresponse(200, "Payment verified and order is now preparing", { order: orderDoc, payment: paymentDoc })
  );
});
export {
verifypayment ,
createpayment    
}
