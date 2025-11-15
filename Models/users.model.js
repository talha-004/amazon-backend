import mongoose from "mongoose";

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
  },
  { timestamps: true }
);

let UserModel = mongoose.model("users", userSchema);

export default UserModel;
