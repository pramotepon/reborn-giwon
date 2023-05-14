import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import activityRouter from "./routes/activities.js";
import userRouter from "./routes/users.js";
const PORT = 8080;
const IP_ADDRESS = "172.29.75.87"; // Replace with the IP address from step 1

dotenv.config();

const corsOptions = {
	origin: "http://localhost:5173",
	credentials: true,
};

const app = express();
app.use(
	express.json({
		limit: "200kb",
	})
);
app.use(cookieParser());
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_USER_URI, {
	dbName: process.env.MONGO_DATABASE,
	writeConcern: "majority",
	retryWrites: true,
	user: process.env.MONGO_USER,
	pass: process.env.MONGO_PASS,
});

app.use("/users", userRouter);
app.use("/activities", activityRouter);

app.listen(PORT, IP_ADDRESS, () => {
	console.log(`Server is running on http://${IP_ADDRESS}:${PORT}`);
});
