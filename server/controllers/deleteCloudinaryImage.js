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

export default deleteFile;

// HOW TO USE BY GPT -> But i'm just call a function XD
// const publicId = "your-public-id";
// deleteFile(publicId)
//   .then(() => {
//     console.log("File deletion successful.");
//   })
//   .catch((error) => {
//     console.error("File deletion failed:", error);
//   });
