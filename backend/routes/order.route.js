import express from "express";
import {
	createOrder,
	getOrderById,
	updateOrderToPaid,
} from "../controllers/order.controller.js";
import { protect } from "../middlewares/auth.midddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").post(protect, updateOrderToPaid);

export default router;
