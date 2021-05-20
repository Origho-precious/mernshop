import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {});
app.use("/api/product", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server running ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
	)
);

