import User from "../../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import * as dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_KEY;
const bcryptSalt = bcrypt.genSaltSync(10);

const resetPassword = async (req, res) => {
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

const userResetPassword = {
    resetPassword: resetPassword
};

export default userResetPassword;
