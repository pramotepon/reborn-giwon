import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
import Activity from "../../models/Activity.js";
import User from "../../models/User.js";

dotenv.config();

// Cloudinary configuration
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_BOOM_CLOUDNAME,
	api_key: process.env.CLOUDINARY_BOOM_API_KEY,
	api_secret: process.env.CLOUDINARY_BOOM_API_SECRET,
});

const cloudinaryImageUpload = async (img) => {
	if (!img) {
		throw new Error("No image provided.");
	}

	const validFileTypes = ["jpg", "jpeg", "gif", "png"];
	const fileType = img.split(".").pop().toLowerCase();

	if (!validFileTypes.includes(fileType)) {
		throw new Error(
			"Invalid file type. Only JPG, JPEG, GIF, and PNG files are allowed."
		);
	}

	const response = await cloudinary.uploader.upload(img, {
		height: 150,
		width: 150,
		crop: "fill",
	});

	return response.url;
};

const addActivity = async (req, res) => {
	let {
		user_id,
		activity_name,
		activity_type,
		calendar,
		duration,
		description,
		image, // PC PATH
	} = req.body;

	try {
		let imageCloudUrl = null;
		if (image) {
			imageCloudUrl = await cloudinaryImageUpload(image);
		}

		const newActivity = new Activity({
			user_id,
			activity_name,
			activity_type,
			calendar,
			duration,
			description,
			image: imageCloudUrl,
		});

		await newActivity.save();
		res.json("Activity added!");
	} catch (error) {
		res.status(400).json("Error: " + error);
	}
};

const activityAddController = {
	addActivity: addActivity,
};

export default activityAddController;
