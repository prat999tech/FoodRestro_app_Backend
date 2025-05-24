import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: "food", required: true },
  quantity: { type: Number, required: true, min: 1 }
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  items: [cartItemSchema],
  updatedAt: { type: Date, default: Date.now }
});

export const Cart = mongoose.model("Cart", cartSchema);
