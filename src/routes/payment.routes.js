import { Router } from "express";
import { createpayment, verifypayment } from "../controllers/payment.controller.js";
import { verifyJWT } from "../middleware/auth.js"; // Assuming you use JWT auth

const router = Router();

// Create a Razorpay payment order
router.post("/create", verifyJWT, createpayment);

// Verify Razorpay payment
router.post("/verify", verifyJWT, verifypayment);

export default router;
