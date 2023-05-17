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
		} = req.body;

		// console.log(req.body);
		// console.log(req.file);

		let imageCloudUrl = null;
		let cloudinaryPublicId = null;

		if (req.file) {

			cloudinary.config({
				cloud_name: process.env.CLOUDINARY_BOOM_CLOUDNAME,
				api_key: process.env.CLOUDINARY_BOOM_API_KEY,
				api_secret: process.env.CLOUDINARY_BOOM_API_SECRET,
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
			duration,
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
