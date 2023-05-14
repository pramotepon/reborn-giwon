import Activity from '../../models/Activity.js';
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";

dotenv.config();

// Cloudinary configuration
cloudinary.config({
	cloud_name: process.env.TOEY_CLOUD_NAME,
	api_key: process.env.TOEY_API_KEY,
	api_secret: process.env.TOEY_API_SECRET,
});

const deleteFile = async (publicId) => {
	try {
		const result = await cloudinary.uploader.destroy(publicId);
		if (result.result === "ok") {
			console.log(`File with public ID ${publicId} has been deleted.`);
		} else {
			throw new Error("Failed to delete file from Cloudinary.");
		}
	} catch (error) {
		throw new Error("Error deleting file from Cloudinary: " + error);
	}
};

const activityUpdate = async (req, res) => {
    // res.json('Hello from register');
    const { activity_name, activity_type, calendar, duration, description, image } = req.body;
    const activityId = req.params.id;

    try {
        const activity = await Activity.findOneAndUpdate(
          { _id: activityId },
          { activity_name, activity_type, calendar, duration, description, image },
          { new: true }
        );
        if (!activity) {
          return res.status(404).json({ message: 'Activity not found' });
        }
        res.json(activity);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
};

const activityEditController = {
    activityUpdate: activityUpdate
};

export default activityEditController;