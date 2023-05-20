import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
import fs from "fs";
import multer from "multer";
import Activity from "../../models/Activity.js";
import User from "../../models/User.js";
import deleteFile from "../deleteCloudinaryImage.js";
const allowedExtensions = [".jpeg", ".jpg", ".png", ".gif"];

dotenv.config();

// Cloudinary configuration

const getFileExtensionName = (fileName) => {
	const parts = fileName.split(".");
	if (parts.length === 1) {
		return ""; // Return empty string if no dot is found in the file name
	}
	const extension = parts[parts.length - 1];
	return "." + extension;
};

const upload = multer({ dest: "uploads/" });

const addActivity = async (req, res) => {
	try {
		const {
			user_id,
			activity_name,
			activity_type,
			calendar,
			duration,
			description,
			weight,
		} = req.body;

		// console.log(req.body);
		// console.log(req.file);
		// console.log(JSON.parse(duration));

		let imageCloudUrl = null;
		let cloudinaryPublicId = null;

		await User.findOneAndUpdate(
			{ _id: user_id },
			{ weight: weight },
			{ new: true }
		);

		if (req.file) {
			await cloudinary.config({
				cloud_name: process.env.IMAGE_CLOUD_NAME,
				api_key: process.env.IMAGE_API_KEY,
				api_secret: process.env.IMAGE_API_SECRET,
			});

			const fileExtension = getFileExtensionName(req.file.originalname);

			if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
				return res.status(400).json({ error: "Invalid image file" });
			}

			const uploadResult = await cloudinary.uploader.upload(req.file.path);
			imageCloudUrl = uploadResult.secure_url;
			cloudinaryPublicId = uploadResult.public_id;

			fs.unlinkSync(req.file.path);
		}

		const newActivity = new Activity({
			user_id,
			activity_name,
			activity_type,
			calendar,
			duration: JSON.parse(duration), // Assign the hour and minute values to the duration field
			description,
			image: imageCloudUrl,
			cloudinary_public_id: cloudinaryPublicId,
		});

		await newActivity.save();
		res.json("Activity added!");
	} catch (error) {
		res.status(400).json({ error: "Error: " + error });
	}
};

const activityAddController = {
	addActivity,
};

export default activityAddController;
