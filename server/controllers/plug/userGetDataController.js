import User from '../../models/User.js';

import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_KEY;

const userData = async (req, res) => {
    const { token } = req.params;
    if (token) {
        // กำหนด Exp times
        jwt.verify(token, jwtSecret, {}, async (err, user) => {
            if (err) throw err;
            const { displayName, weight, goal, _id } = await User.findOne(user.id);
            res.json({ displayName, weight, goal, _id });
        });
    } else {
        res.json(null);
    }
}

const userGetDataController = {
    userData: userData
};

export default userGetDataController;