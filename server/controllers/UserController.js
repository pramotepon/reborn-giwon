import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import generateToken from '../utils/generateToken.js'
import createToken from '../utils/generateToken.js';
import userGetId from '../utils/userGetId.js';
import deleteCloudinaryImage from './deleteCloudinaryImage.js';
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";

dotenv.config();

// JWT Secret
const jwtSecret = process.env.JWT_KEY;
// Bcrypt salt
const bcryptSalt = bcrypt.genSaltSync(10);

const UserController = {};

// Function user register
UserController.register = async (req, res) => {
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
}

// Function user access reset password
UserController.accessResetPassword = async (req, res) => {
    let body = req.body;
    let user = await User.findOne({ email: body.email });
    if (user) {
        if (body.height == user.height && body.currentweight == user.weight && body.gender === user.gender) {
            const token = await generateToken(user._id)
            return res.json(token)
        }
        else {
            return res.status(401).json({ status: "error", message: "You can't reset password" })
        }
    }
    else {
        return res.status(401).json({ status: "error", message: "User not found" })
    }
}

// Function user reset password
UserController.resetPassword = async (req, res) => {
    try {
        let body = req.body;
        const token = req.header('Authorization').replace('Bearer ', '');
        jwt.verify(token, jwtSecret, {}, async (err, data) => {
            if (err) {
                return res.status(403).json("Token is not match.");
            }
            const filter = { _id: data._id };
            const update = { password: bcrypt.hashSync(body.password, bcryptSalt) };
            let user = await User.findOneAndUpdate(filter, update);
            if (user) {
                return res.json({ status: "success", message: "Password reset successfully" })
            } else {
                return res.status(401).json({ status: "error", message: "Email mismatch" })
            }
        });
    } catch (e) {
        console.log(e.message);
        return res.json(e.message);
    }
}

// Function user login
UserController.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const error = new Error();
        if (!email || !password) {
            error.message = "Email or Password invalid";
            error.status_code = 422;
            throw error;
        }
        const user = await User.findOne({ email });
        if (user) {
            const chkPass = bcrypt.compareSync(password, user.password);
            if (chkPass) {
                const token = createToken(user._id);
                res.json({ token });
            } else {
                error.message = "You have entered an invalid email or password";
                error.status_code = 422;
                throw error;
            }
        } else {
            error.message = "You have entered an invalid email or password";
            error.status_code = 422;
            throw error;
        }
    } catch (e) {
        res.json({ error: e });
    }
}

// Function user getData
UserController.getData = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(403).json('Access denine token.');
        }
        // กำหนด Exp times
        jwt.verify(token, jwtSecret, {}, async (err, user) => {
            if (err) {
                return res.status(403).json("Access denine token.")
            };
            const { displayName, weight, height, goal, image, gender, _id } = await User.findOne({ _id: user._id });
            res.json({ displayName, weight, height, goal, image, gender, _id });
        });
    } catch (e) {
        res.json(e.message);
    }
}

// Function user edit
UserController.update = async (req, res) => {
    try {
        let { displayName, height, weight, gender, image, extImage } = req.body;
        // let userId;
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(403).json('Access denine token.');
        }
        const userId = userGetId(token);
        if (!userId) {
            return res.status(403).json('Someting wrong with your id.')
        }
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
                await deleteCloudinaryImage(user.cloudinary_public_id);
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

// Function check goal success
UserController.goalCheck = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        //เช็ค ID user
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //เช็คว่าน้ำหนักจริง น้อยกว่าหรือเท่ากับ น้ำหนักเป้าหมาย
        //true ถ้าถึงเป้า(เท่าหรือน้อยกว่า), false ถ้ายังไม่ถึง(มากกว่า)

        const weight = user.weight;
        const goal = user.goal;

        const isGoalAchieved = weight <= goal;

        res.json(isGoalAchieved);


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Function check goal success
UserController.updateGoal = async (req, res) => {
    const userId = req.params.id;
    const { goal } = req.body;
    console.log(goal);
    console.log(userId);

    try {
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { goal },
            { new: true }
        );

        //เช็ค ID user

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export default UserController;