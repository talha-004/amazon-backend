import express from "express";

import {
  addToCart,
  getCart,
  updateCart,
  deleteCart,
} from "../Controllers/cart.controller.js";

const router = express.Router();

router.post("/addToCart", addToCart);
router.patch("/updateCart", updateCart);
router.get("/getCart", getCart);
router.delete("/deleteCart", deleteCart);

export default router;
