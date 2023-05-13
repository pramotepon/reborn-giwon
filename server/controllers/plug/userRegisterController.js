import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
import User from "../../models/User.js";

dotenv.config();

// Configuration
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_BOOM_CLOUDNAME,
	api_key: process.env.CLOUDINARY_BOOM_API_KEY,
	api_secret: process.env.CLOUDINARY_BOOM_API_SECRET,
});

const bcryptSalt = bcrypt.genSaltSync(10);

// Function register
const register = async (req, res) => {
	try {
		const { email, password, displayName, height, weight, gender, image } =
			req.body;

		// Array of allowed files
		const array_of_allowed_files = ["png", "jpeg", "jpg", "gif"];

		let url_image = image;

		if (image) {
			// Get the extension of the uploaded file
			var file_extension = image.split(".").pop();
			// Check if the uploaded file is allowed
			if (!array_of_allowed_files.includes(file_extension)) {
				throw Error("Invalid file");
			}
			const result = await cloudinary.uploader.upload(image, {
				height: 150,
				width: 150,
				crop: "fill",
			});

			if (!result) {
				throw Error("Cloud image server have a poblem.");
			}
			url_image = result.url;
		}

		const user = await User.create({
			email,
			displayName,
			height,
			weight,
			gender,
			image: url_image,
			password: bcrypt.hashSync(password, bcryptSalt),
		});
		res.json(user);
	} catch (e) {
		res.json(e);
	}
};

const userRegisterController = {
	register: register,
};

export default userRegisterController;
