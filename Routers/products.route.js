import express from "express";
import { getAllProducts } from "../Controllers/products.controller.js";

const router = express.Router();

router.get("/getAllProducts", getAllProducts);

export default router;
