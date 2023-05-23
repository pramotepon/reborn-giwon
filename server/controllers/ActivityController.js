import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
import Activity from "../models/Activity.js";
import User from "../models/User.js";
import deleteFileCloudinaryImage from "./deleteCloudinaryImage.js";
import mongoose from "mongoose";

const array_of_allowed_files = ["png", "jpeg", "jpg", "gif"];

dotenv.config();

const ActivityController = {};

// Get one activity
ActivityController.getActivity = async (req, res) => {
    const { id } = req.params;
    const showOne = await Activity.findOne({
        _id: id,
    });

    res.json(showOne);
}

// Get all activities
ActivityController.getActivities = async (req, res) => {
    const { id } = req.params;

    Activity.find({ user_id: id })
        .then((activities) => res.json(activities))
        .catch((err) => res.status(400).json({ error: "Something Went Wrong" }));
}
// Post Activity
ActivityController.createActivity = async (req, res) => {
    try {
        const {
            user_id,
            activity_name,
            activity_type,
            calendar,
            duration,
            description,
            weight,
            image,
            extImage,
        } = req.body;
        console.log(req.body);

        // let imageCloudUrl = null;
        // let cloudinaryPublicId = null;

        await User.findOneAndUpdate(
            { _id: user_id },
            { weight: weight },
            { new: true }
        );

        let url_image = image;
        let public_id_image = null;

        if (extImage) {
            // Configuration
            await cloudinary.config({
                cloud_name: process.env.IMAGE_CLOUD_NAME,
                api_key: process.env.IMAGE_API_KEY,
                api_secret: process.env.IMAGE_API_SECRET,
            });
            // Get the extension of the uploaded file
            // Check if the uploaded file is allowed
            if (!array_of_allowed_files.includes(extImage)) {
                return res.status(415).json("Invalid file");
            }
            const result = await cloudinary.uploader.upload(image, {
                height: 150,
                width: 150,
                crop: "fill",
            });
            if (!result) {
                return res.status(500).json("Cloud image server have a poblem.");
            }
            url_image = result.url;
            public_id_image = result.public_id;
        }

        // if (req.file) {
        // 	await cloudinary.config({
        // 		cloud_name: process.env.IMAGE_CLOUD_NAME,
        // 		api_key: process.env.IMAGE_API_KEY,
        // 		api_secret: process.env.IMAGE_API_SECRET,
        // 	});

        // 	const fileExtension = getFileExtensionName(req.file.originalname);

        // 	if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
        // 		return res.status(400).json({ error: "Invalid image file" });
        // 	}

        // 	const uploadResult = await cloudinary.uploader.upload(req.file.path);
        // 	imageCloudUrl = uploadResult.secure_url;
        // 	cloudinaryPublicId = uploadResult.public_id;

        // 	fs.unlinkSync(req.file.path);
        // }

        const newActivity = new Activity({
            user_id,
            activity_name,
            activity_type,
            calendar,
            duration: JSON.parse(duration), // Assign the hour and minute values to the duration field
            description,
            // image: imageCloudUrl,
            // cloudinary_public_id: cloudinaryPublicId,
            image: url_image,
            current_weight: weight,
            cloudinary_public_id: public_id_image,
        });

        await newActivity.save();
        res.status(200).json("Activity added!");
    } catch (error) {
        res.status(400).json({ error: "Error: " + error });
    }
}
// Update activity
ActivityController.updateActivity = async (req, res) => {
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
                return res.status(415).json("Invalid file");
            }
            const result = await cloudinary.uploader.upload(image, {
                height: 150,
                width: 150,
                crop: "fill",
            });
            if (!result) {
                return res.status(500).json("Cloud image server have a poblem.");
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
}
// Delete activity
ActivityController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log("Invalid ID");
            return res.status(400).json("Invalid ID");
        }

        // Check if the activity exists
        const existingActivity = await Activity.findById(id);
        if (!existingActivity) {
            console.log("Activity not found");
            return res.status(404).json("Activity not found");
        }

        // Delete the activity
        const deletedActivity = await existingActivity.deleteOne();

        // Delete the image from cloudinary
        if (existingActivity.cloudinary_public_id) {
            await deleteFileCloudinaryImage(existingActivity.cloudinary_public_id);
        }
        console.log("deletedActivity");

        res.json("Activity is deleted");
    } catch (error) {
        console.error(error);
        res.status(500).json("Server Error");
    }
}

export default ActivityController;