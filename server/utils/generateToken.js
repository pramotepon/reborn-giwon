import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_KEY;

const createToken = (_id) => {
    return jwt.sign({ _id }, jwtSecret, { expiresIn: '3d' });
}

export default createToken;