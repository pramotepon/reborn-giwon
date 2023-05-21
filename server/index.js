import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import activityRouter from "./routes/activities.js";
import userRouter from "./routes/users.js";

dotenv.config();

const IP_ADDRESS_Boom = "172.29.75.87";
const IP_ADDRESS = "127.0.0.1";
const PORT = process.env.PORT || 3000;

const corsOptions = {
	origin: "*",
	credentials: false,
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

app.get("/", (req, res) => {
	res.json("Hello we are G-Won");
});
app.use("/users", userRouter);
app.use("/activities", activityRouter);

app.listen(PORT, IP_ADDRESS, () => {
	console.log(`Server is running on http://${IP_ADDRESS}:${PORT}`);
});
