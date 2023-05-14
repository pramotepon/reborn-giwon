const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
import * as dotenv from "dotenv";

// Configure Cloudinary credentials
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_BOOM_CLOUDNAME,
	api_key: process.env.CLOUDINARY_BOOM_API_KEY,
	api_secret: process.env.CLOUDINARY_BOOM_API_SECRET,
});
const app = express();
const upload = multer({ dest: "uploads/" });

// Allowed file extensions
const allowedExtensions = [".jpeg", ".jpg", ".png", ".gif"];

// CORS middleware
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Replace with your frontend URL
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	next();
});

// Route to handle file upload
app.post("/api/upload", upload.single("image"), (req, res) => {
	const file = req.file;
	const fileExtension = getFileExtensionName(file.originalname);

	// Check if a file was uploaded
	if (!file) {
		return res.status(400).json({ error: "No file uploaded" });
	}

	if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
		// Delete the invalid file
		fs.unlinkSync(file.path);
		return res.status(500).json({ error: "Invalid image file" });
	}

	// Upload the file to Cloudinary
	cloudinary.uploader.upload(file.path, (error, result) => {
		// Remove the uploaded file from the local server
		fs.unlinkSync(file.path);

		if (error) {
			console.log(error);
			return res.status(500).json({ error: "Failed to upload image" });
		}

		// Handle the Cloudinary response as per your application requirements
		res.json({ public_id: result.public_id, url: result.secure_url });
	});
});

// Function to get the file extension
const getFileExtensionName = (fileName) => {
	const parts = fileName.split(".");
	if (parts.length === 1) {
		return ""; // Return empty string if no dot is found in the file name
	}
	const extension = parts[parts.length - 1];
	return "." + extension;
};

// Start the server
const PORT = 8080;
const IP_ADDRESS = "172.29.75.87"; // Replace with the IP address from step 1
app.listen(PORT, IP_ADDRESS, () => {
	console.log(`Server is running on http://${IP_ADDRESS}:${PORT}`);
});

const activityAddController = {
	uploadCloudinaryImage: uploadCloudinaryImage,
};

export default uploadCloudinaryImage;
