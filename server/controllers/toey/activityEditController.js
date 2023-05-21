import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
import Activity from "../../models/Activity.js";
import User from "../../models/User.js";

dotenv.config();

// Cloudinary configuration
cloudinary.config({
	cloud_name: process.env.IMAGE_CLOUD_NAME,
	api_key: process.env.IMAGE_API_KEY,
	api_secret: process.env.IMAGE_API_SECRET,
});

const activityUpdate = async (req, res) => {
	console.log(req.body);
};

const activityEditController = {
	activityUpdate: activityUpdate,
};

export default activityEditController;
