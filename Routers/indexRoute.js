import express from "express";
import userRouter from "./users.route.js";
import productRouter from "./products.route.js";
import cartRouter from "./cart.route.js";
import { authentication } from "../Middlewares/auth.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/products", productRouter);

// must login
router.use("/cart", authentication, cartRouter);

export default router;
