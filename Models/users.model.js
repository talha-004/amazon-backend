import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true, default: 1 },
  },
  { _id: false }
);

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true },
    priceAtPurchase: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: "Pending" }, // Pending, Delivered, Cancelled
    placedAt: { type: Date, default: Date.now },
    shippingAddress: { type: String },
  },
  { _id: true }
);

let userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["USER"],
      default: "USER",
    },
    termAndConditions: { type: Boolean, default: false },
    cart: [cartItemSchema],
    orders: [orderSchema],
  },
  { timestamps: true }
);

let UserModel = mongoose.model("User", userSchema);

export default UserModel;
