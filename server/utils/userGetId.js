import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_KEY;

const userGetId = (token) => {
    try {
        let userId;
        jwt.verify(token, jwtSecret, {}, (err, user) => {
            if (err) {
                return res.status(403).json("Access denine token.");
            };
            console.log(user._id);
            userId = user._id;
        });
        return userId;
    } catch (error) {
        console.log(error);
    }
}

export default userGetId;