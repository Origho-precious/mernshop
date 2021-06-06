import asyncHandler from "express-async-handler";
import Product from "../models/product.model.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
export const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

// @desc delete product
// @route DELETE /api/products/:id
// @access Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		product.remove();
		res.status(200).json({ message: "Product removed successfully" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

// @desc edit product
// @route PATCH /api/products/:id
// @access Private/Admin
export const editProduct = asyncHandler(async (req, res) => {
	if (req.body) {
		const product = await Product.findByIdAndUpdate(req.params.id, req.body);

		if (product) {
			const newProduct = await Product.findById(req.params.id);

			res.status(200).json(newProduct);
		} else {
			res.status(404);
			throw new Error("Product not found");
		}
	} else {
		res.status(422);
		throw new Error("Can't update product with null");
	}
});
