import User from '../../models/User.js';
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";

dotenv.config();

// Cloudinary configuration
cloudinary.config({
	cloud_name: process.env.IMAGE_CLOUD_NAME,
	api_key: process.env.IMAGE_API_KEY,
	api_secret: process.env.IMAGE_API_SECRET,
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

const userUpdate = async (req, res) => {
    let { displayName, height, weight, gender, image } = req.body;
    const userId = req.params.id;

    try {
        let user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete previous image from Cloudinary
        if (user.cloudinary_public_id) {
            await deleteFile(user.cloudinary_public_id);
        }

        // Upload new image to Cloudinary
        let cloudinary_public_id = null;
        if (image) {
            const result = await cloudinary.uploader.upload(image);
            image = result.secure_url;
            cloudinary_public_id = result.public_id;
        }

        // Update user
        user = await User.findOneAndUpdate(
            { _id: userId },
            { displayName, height, weight, gender, image, cloudinary_public_id },
            { new: true }
        );

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


const userEditProfileController = {
    userUpdate: userUpdate
};

export default userEditProfileController;