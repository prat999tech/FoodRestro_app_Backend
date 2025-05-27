import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js"; // <-- your multer config
import {
  createfood,
  updatefooditem,
  getfoodbyrestaurent,
  getfoodbyid,
  deletefood
} from "../controllers/food.controller.js";
import { verifyJWT } from "../middleware/auth.js"; // If you want to protect routes

const router = Router();

// Create a food item (with cover image upload)
router.post(
  "/create",
  verifyJWT, // Optional: protect this route
    upload.fields([{ name: "coverimage", maxCount: 1 }]), // If you want to allow updating cover image
  createfood
);

// Update a food item by ID (optionally allow image update)
router.put(
  "/update/:id",
  verifyJWT,
  updatefooditem
);

// Get all food items by restaurant ID
router.get("/by-restaurant/:id", getfoodbyrestaurent);

// Get food item by food ID
router.get("/by-id/:foodid", getfoodbyid);

// Delete food item by food ID
router.delete("/delete/:foodid", verifyJWT, deletefood);

export default router;
