import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import activityRouter from "./routes/activities.js";
import userRouter from "./routes/users.js";

// invoke app from express;
const app = express();

// Config dotenv
dotenv.config();

// Client url
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
// Server url
const SERVER_URL = process.env.SERVER_URL || 'http://localhost';
// Port
const PORT = process.env.PORT || 3000;

// Cors options
const corsOptions = {
	origin: CLIENT_URL,
	credentials: true,
};

app.use(
	express.json({
		limit: "200kb",
	})
);
app.use(cookieParser());
app.use(cors(corsOptions));

// Router
app.get("/", (req, res) => {
	res.json("Hello we are G-Won");
});
app.use("/users", userRouter);
app.use("/activities", activityRouter);

// Connect database
const start = async () => {
	await mongoose.connect(process.env.MONGO_USER_URI, {
		dbName: process.env.MONGO_DATABASE,
		writeConcern: "majority",
		retryWrites: true,
		user: process.env.MONGO_USER,
		pass: process.env.MONGO_PASS,
	}).then(() => {
		console.log('Mongodb connected.');
	}).catch((err) => {
		console.log(err);
	});
	// Connect server
	app.listen(PORT, () => {
		console.log(`Server is running on ${SERVER_URL}:${PORT}`);
	});
}

// Run database and server
start();