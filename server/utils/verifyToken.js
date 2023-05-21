import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import * as dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_KEY;
const bcryptSalt = bcrypt.genSaltSync(10);

const verifyToken = async (token) => {
    try {
        jwt.verify(token, jwtSecret, {}, async (err, user) => {
            if (err) {
                return { message: "Access denine token." };
            };
            const { displayName, weight, height, goal, image, gender, _id } = await User.findOne({ _id: user._id });
            return _id;
        });
    } catch (e) {
        return { message: e.message };
    }
}

export default verifyToken;