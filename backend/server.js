import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.route.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("API is running...");
});
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server running ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);
