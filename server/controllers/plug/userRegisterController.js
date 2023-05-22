import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
import User from "../../models/User.js";
import createToken from "../../utils/generateToken.js";

dotenv.config();

const bcryptSalt = bcrypt.genSaltSync(10);

// Function register
const register = async (req, res) => {
	try {
		const {
			email,
			password,
			displayName,
			height,
			weight,
			gender,
			image,
			extImage,
		} = req.body;
		const chkEmail = await User.findOne({ email }).count();
		if (chkEmail) {
			return res.status(403).send("Email is valid");
		}
		// Array of allowed files
		const array_of_allowed_files = ["png", "jpeg", "jpg", "gif", "jfif"];
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

		await User.create({
			email,
			displayName,
			height,
			weight,
			gender,
			image: url_image,
			cloudinary_public_id: public_id_image,
			password: bcrypt.hashSync(password, bcryptSalt),
		});

		res.json("Registration completed.");
	} catch (e) {
		console.log(e);
		res.json(e);
	}
};

const userRegisterController = {
	register: register,
};

export default userRegisterController;
