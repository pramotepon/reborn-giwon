import User from '../../models/User.js';
import { v2 as cloudinary } from "cloudinary";
import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_KEY;

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
    try {
        let { displayName, height, weight, gender, image, extImage } = req.body;
        let userId;
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(403).json('Access denine token.');
        }
        jwt.verify(token, jwtSecret, {}, (err, user) => {
            if (err) {
                return res.status(403).json("Access denine token.");
            };
            userId = user._id;
        });
        let cloudinary_public_id;
        // Array of allowed files
        const array_of_allowed_files = ["png", "jpeg", "jpg", "gif", "jfif"];
        // console.log(extImage);
        if (extImage && array_of_allowed_files.includes(extImage)) {
            // Cloudinary configuration
            await cloudinary.config({
                cloud_name: process.env.IMAGE_CLOUD_NAME,
                api_key: process.env.IMAGE_API_KEY,
                api_secret: process.env.IMAGE_API_SECRET,
            });
            let user = await User.findOne({ _id: userId });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Delete previous image from Cloudinary
            if (user.cloudinary_public_id) {
                await deleteFile(user.cloudinary_public_id);
            }

            // Upload new image to Cloudinary
            const result = await cloudinary.uploader.upload(image, {
                height: 150,
                width: 150,
                crop: "fill",
            });
            if (!result) {
                throw new Error("Cloud image server have a poblem.");
            }
            image = result.secure_url;
            cloudinary_public_id = result.public_id;
        }

        // Update user
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { displayName, height, weight, gender, image, cloudinary_public_id },
            { new: true }
        );
        if (!user) {
            return res.status(400).json("Error");
        }
        // const token = await createToken(user._id);
        return res.json({ token: token, message: "Update user successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}


const userEditProfileController = {
    userUpdate: userUpdate
};

export default userEditProfileController;