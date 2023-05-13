import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
import Activity from "../../models/Activity.js";
import User from "../../models/User.js";
import deleteFile from "../deleteCloudinaryImage.js";

dotenv.config();

// Cloudinary configuration

const cloudinaryImageUpload = async (img) => {
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_BOOM_CLOUDNAME,
		api_key: process.env.CLOUDINARY_BOOM_API_KEY,
		api_secret: process.env.CLOUDINARY_BOOM_API_SECRET,
	});
	if (!img) {
		throw new Error("No image provided.");
	}

	const validFileTypes = ["jpg", "jpeg", "gif", "png"];
	const fileType = img.split(".").pop().toLowerCase();

	// if (!validFileTypes.includes(fileType)) {
	// 	throw new Error(
	// 		"Invalid file type. Only JPG, JPEG, GIF, and PNG files are allowed."
	// 	);
	// }

	const response = await cloudinary.uploader.upload(img, {
		height: 150,
		width: 150,
		crop: "fill",
	});

	return {
		url: response.secure_url,
		publicId: response.public_id,
	};
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
		let cloudinaryPublicId = null;

		if (image) {
			const uploadResult = await cloudinaryImageUpload(image);
			imageCloudUrl = uploadResult.url;
			cloudinaryPublicId = uploadResult.publicId;
		}

		const newActivity = new Activity({
			user_id,
			activity_name,
			activity_type,
			calendar,
			duration,
			description,
			image: imageCloudUrl,
			cloudinary_public_id: cloudinaryPublicId,
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
