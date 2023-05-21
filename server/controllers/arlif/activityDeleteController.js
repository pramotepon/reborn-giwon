import mongoose from "mongoose";
import deleteCloudinaryImage from "../../controllers/deleteCloudinaryImage.js";
import Activity from "../../models/Activity.js";

const activityDelete = async (req, res) => {
	console.log(req.params);
	try {
		const { id } = req.params;

		// Validate the id
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json("Invalid ID");
			console.log("Invalid ID");
		}

		// Check if the activity exists
		const existingActivity = await Activity.findById(id);
		if (!existingActivity) {
			return res.status(404).json("Activity not found");
			console.log("Activity not found");
		}

		// Delete the activity
		const deletedActivity = await existingActivity.deleteOne();

		// Delete the image from cloudinary
		await deleteCloudinaryImage(existingActivity.cloudinary_public_id);

		console.log("deletedActivity");

		res.json("Activity is deleted");
	} catch (error) {
		console.error(error);
		res.status(500).json("Server Error");
	}
};

const activityDeleteController = {
	activityDelete: activityDelete,
};

export default activityDeleteController;
