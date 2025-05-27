import { Router } from "express";
import {
  createorderfromcart,
  getorderbyuser,
  getorderbyid,
  cancelorder
} from "../controllers/order.controller.js";
import { verifyJWT } from "../middleware/auth.js"; // Assuming you use JWT auth

const router = Router();

// Create an order from cart
router.post("/create-from-cart", verifyJWT, createorderfromcart);

// Get all orders for the logged-in user
router.get("/my-orders", verifyJWT, getorderbyuser);

// Get a specific order by order ID
router.get("/:orderid", verifyJWT, getorderbyid);

// Cancel an order by order ID
router.put("/:orderid/cancel", verifyJWT, cancelorder);

export default router;
