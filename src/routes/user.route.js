/*
import {Router} from "express"
const router=Router()
router.route("/register").post(
    upload.fields([

        {
        name:"avatar",
        maxcount:1
        },
        {
            name:"coverimage",
            maxcount:1
        }
    ]),
    registeruser


)
console.log("we have finished regusteruser method execution");
export default router
*/
import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js"; // Your multer config file
import {
  registeruser,
  loginUser,
  logoutuser,
  refreshaccesstoken,
  changepassword,
  getuserdetails,
  updateavatar,
  updatecoverimage,
  updateaccountdetails,
  getuserorder
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.js"; // Your JWT middleware

const router = Router();

// Register user with avatar and cover image upload
router.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverimage", maxCount: 1 }
  ]),
  registeruser
);

// Login user
router.post("/login", loginUser);

// Logout user (protected)
router.post("/logout", verifyJWT, logoutuser);

// Refresh access token
router.post("/refresh-token", refreshaccesstoken);

// Change password (protected)
router.post("/change-password", verifyJWT, changepassword);

// Get user details (protected)
router.get("/me", verifyJWT, getuserdetails);

// Update account details (protected)
router.put("/update-account", verifyJWT, updateaccountdetails);

// Update avatar (protected, single file upload)
router.put(
  "/update-avatar",
  verifyJWT,
  upload.single("avatar"),
  updateavatar
);

// Update cover image (protected, single file upload)
router.put(
  "/update-cover",
  verifyJWT,
  upload.single("coverimage"),
  updatecoverimage
);

// Get user orders (protected)
router.get("/orders", verifyJWT, getuserorder);

export default router;

