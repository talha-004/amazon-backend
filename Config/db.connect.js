import mongoose from "mongoose";
import { env } from "./env.config.js";

export const dbConnect = async () => {
  try {
    await mongoose.connect(env.DB_URI);
    console.log("DB Connected Successfully!👍");
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};
