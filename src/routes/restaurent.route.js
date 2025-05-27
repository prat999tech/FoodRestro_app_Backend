import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import {
  createrestaurent,
  updaterestaurentdetails,
  getrestrodetails,
  getallreviews,
  getmenuofrestaurent
} from "../controllers/restaurent.controller.js";

const router = Router();

// Set up multer for file uploads (cover image)
//const upload = multer({ dest: "uploads/" });

// Register a restaurant with cover image upload
router.post(
  "/registerrestro",
  upload.fields([{ name: "coverImage", maxCount: 1 }]),
  createrestaurent
);

// Update restaurant details
router.put("/updaterestro/:restaurentid", updaterestaurentdetails);

// Get restaurant details
router.get("/getrestrodetails/:restaurentid", getrestrodetails);

// Get all reviews for a restaurant
router.get("/getallreviews/:restaurentid", getallreviews);

// Get menu of a restaurant
router.get("/getmenu/:restaurentid", getmenuofrestaurent);

export default router;
