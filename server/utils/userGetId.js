import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_KEY;

const userGetId = (token) => {
    jwt.verify(token, jwtSecret, {}, async (err, data) => {
        if (err) {
            return res.status(403).json("Token is not match.");
        }
        return data._id;
    });
}

export default userGetId;