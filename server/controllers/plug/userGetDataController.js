import User from '../../models/User.js';

import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_KEY;

const userData = async (req, res) => {
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

const userGetDataController = {
    userData: userData
};

export default userGetDataController;