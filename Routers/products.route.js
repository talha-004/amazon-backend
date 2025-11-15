import express from "express";
import {
  getAllProducts,
  addProduct,
  singleProduct,
  updateProduct,
  deleteProduct,
} from "../Controllers/products.controller.js";

import { authentication, isAdmin } from "../Middlewares/auth.js";

const router = express.Router();

router.get("/getAll", getAllProducts);
router.get("/:productId", singleProduct);

//⭐ ---==(ADMIN)==---(add, update & delete product)

router.post("/add", authentication, isAdmin, addProduct);
router.patch("/:productId/update", authentication, isAdmin, updateProduct);
router.delete("/:productId/delete", authentication, isAdmin, deleteProduct);

export default router;
