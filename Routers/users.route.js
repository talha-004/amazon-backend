import express from "express";
import {
  getAllUsers,
  login,
  profile,
  registerUser,
} from "../Controllers/users.controller.js";
import { authentication, isAdmin } from "../Middlewares/auth.js";

const router = express.Router();

router.get("/allUsers", authentication, isAdmin, getAllUsers);
router.get("/profile", authentication, profile);
router.post("/register", registerUser);
router.post("/login", login);

export default router;
