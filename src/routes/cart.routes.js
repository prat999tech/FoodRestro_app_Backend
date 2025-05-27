import express from "express";
import {
  additemsincart,
  deleteitemfromcart,
  updateitemincart,
  getusercart
} from "../controllers/cart.controller.js";
import { verifyJWT } from "../middleware/Auth.js"; // Assuming you have an verifyJWT middleware

const router = express.Router();

// Add item to cart
router.post("/add", verifyJWT, additemsincart);

// Delete item from cart
router.delete("/item/:foodid", verifyJWT, deleteitemfromcart);

// Update item quantity in cart
router.put("/item/:foodid", verifyJWT, updateitemincart);

// Get current user's cart
router.get("/", verifyJWT, getusercart);

export default router;
