import User from '../../models/User.js';

import { v2 as cloudinary } from 'cloudinary'

// Configuration 
cloudinary.config({
    cloud_name: process.env.IMAGE_CLOUD_NAME,
    api_key: process.env.IMAGE_API_KEY,
    api_secret: process.env.IMAGE_API_SECRET
});

// Function register
const register = async (req, res) => {

    try {

        const { email, password, displayName, height, weight, gender, image } = req.body;

        // Array of allowed files
        const array_of_allowed_files = ['png', 'jpeg', 'jpg', 'gif'];

        let url_image = image;

        if (image) {
            // Get the extension of the uploaded file
            var file_extension = image.split(".").pop();
            // Check if the uploaded file is allowed
            if (!array_of_allowed_files.includes(file_extension)) {
                throw Error('Invalid file');
            }
            const result = await cloudinary.uploader.upload(image, { height: 150, width: 150, crop: "fill" });

            if (!result) {
                throw Error('Cloud image server have a poblem.');
            }
            url_image = result.url;
        }

        let user = new User();
        user.email = email;
        user.displayName = displayName;
        user.height = height;
        user.weight = weight;
        user.gender = gender;
        user.image = url_image;
        user.password = await user.encryptPassword(password);
        await user.save();
        res.json(user);

    } catch (e) {
        res.json(e);
    }
}

const userRegisterController = {
    register: register
};

export default userRegisterController;