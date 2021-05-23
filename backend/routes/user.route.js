import express from "express";
import {
	authUser,
	getUserProfile,
	registerUser,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.midddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);

export default router;
