import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
import Activity from "../../models/Activity.js";
import User from "../../models/User.js";
import deleteFileCloudinaryImage from "../deleteCloudinaryImage.js";

const array_of_allowed_files = ["png", "jpeg", "jpg", "gif"];

dotenv.config();

const activityUpdate = async (req, res) => {
	let {
		activity_name,
		activity_type,
		calendar,
		description,
		hours,
		minutes,
		weight,
		image,
		extImage,
		latest,
	} = req.body;
	const activityId = req.params.id;
	try {
		let activity = await Activity.findById(activityId);

		if (!activity) {
			return res.status(404).json({ message: "Activity not found" });
		}

		if (image) {
			// Delete old image from Cloudinary
			if (activity.cloudinary_public_id) {
				await deleteFileCloudinaryImage(activity.cloudinary_public_id);
			}
			// Upload new image to Cloudinary
			await cloudinary.config({
				cloud_name: process.env.IMAGE_CLOUD_NAME,
				api_key: process.env.IMAGE_API_KEY,
				api_secret: process.env.IMAGE_API_SECRET,
			});
			// Get the extension of the uploaded file
			// Check if the uploaded file is allowed
			if (!array_of_allowed_files.includes(extImage)) {
				throw new Error("Invalid file");
			}
			const result = await cloudinary.uploader.upload(image, {
				height: 150,
				width: 150,
				crop: "fill",
			});
			if (!result) {
				throw new Error("Cloud image server have a poblem.");
			}
			activity.image = result.url;
			activity.cloudinary_public_id = result.public_id;
		}

		// Update activity fields
		activity.activity_name = activity_name;
		activity.activity_type = activity_type;
		activity.calendar = calendar;
		activity.duration = {
			hour: hours, // Assuming duration.hour and duration.minute are provided in the req.body
			minute: minutes,
		};
		activity.description = description;
		activity.current_weight = weight;
		activity.image;
		activity.cloudinary_public_id;

		// Update user weight

		if (latest === "yes") {
			await User.findOneAndUpdate(
				{ _id: activity.user_id },
				{ weight: weight },
				{ new: true }
			);
		}

		// Save updated activity to database
		activity = await activity.save();

		res.json(activity);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

const activityEditController = {
	activityUpdate: activityUpdate,
};

export default activityEditController;
