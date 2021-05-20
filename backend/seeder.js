import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import connectDB from "./config/db.js";
import User from "./models/user.model.js";
import Order from "./models/order.model.js";
import Product from "./models/product.model.js";

dotenv.config();

connectDB();

const importData = async () => {
	try {
		await Order.deleteMany();
		await User.deleteMany();
		await Product.deleteMany();

		const createdUsers = await User.insertMany(users);

		const adminUser = createdUsers[0]._id;
		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser };
		});

		await Product.insertMany(sampleProducts);

		console.log(`Data Imported`.green.inverse);
		process.exit();
	} catch (error) {
		console.error(`Error: ${error.message}`.red.inverse);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Order.deleteMany();
		await User.deleteMany();
		await Product.deleteMany();

		console.log(`Data Destroyed`.green.inverse);
		process.exit();
	} catch (error) {
		console.error(`Error: ${error.message}`.red.inverse);
		process.exit(1);
	}
};

if (process.argv[2] === "-d") {
	destroyData();
} else {
	importData();
}
