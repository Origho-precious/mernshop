import express from "express";
import { createOrder } from "../controllers/order.controller.js";
import { protect } from "../middlewares/auth.midddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder);

export default router;
