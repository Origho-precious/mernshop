import express from "express";
import { createOrder, getOrderById } from "../controllers/order.controller.js";
import { protect } from "../middlewares/auth.midddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder);
router.route("/:id").get(protect, getOrderById);

export default router;
