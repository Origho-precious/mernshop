import asyncHandler from "express-async-handler";
import Order from "../models/order.model.js";

// @desc Create new order
// @route GET /api/orders
// @access Private
export const createOrder = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error("No order Items");
	} else {
		const order = new Order({
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		const newOrder = await order.save();

		res.status(201).json);
	}
});
