import express from "express";
import {
	deleteProduct,
	editProduct,
	getProductById,
	getProducts,
} from "../controllers/product.controller.js";
import { protect, admin } from "../middlewares/auth.midddleware.js";
const router = express.Router();

router.route("/").get(getProducts);

router
	.route("/:id")
	.get(getProductById)
	.delete(protect, admin, deleteProduct)
	.patch(protect, admin, editProduct);

export default router;
