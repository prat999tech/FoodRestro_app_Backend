import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ limit: "10kb", extended: true }));

app.use(express.static("./public"));

app.use(cookieParser());

import userRoutes from "../routes/user.routes.js";
import restaurentRoutes from "../routes/restaurent.routes.js";
import foodRoutes from "../routes/food.routes.js";
import cartRoutes from "../routes/cart.routes.js";
import orderRoutes from "../routes/order.routes.js";
import paymentRoutes from "../routes/payment.routes.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/restaurants", restaurentRoutes);
app.use("/api/v1/food", foodRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/payment", paymentRoutes);




export default app;
