import express from "express";
import userRouter from "./users.route.js";
import productRouter from "./products.route.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/products", productRouter);

export default router;
