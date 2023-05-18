import User from '../../models/User.js';
import { ObjectId } from 'mongoose';

const verifyResetPassword = async (req, res) => {
    let body = req.body;
    let user = await User.findOne({email: body.email});
    if (user) {
        if (body.height === user.height && body.weight === user.weight && body.gender === user.gender) {
            res.json({"status": "success", "message" : "You can reset password"})
        }
        else {
            res.status(401).json({"status": "error", "message" : "You can't reset password"})
        }
    }
    else {
        res.status(401).json({"status": "error", "message" : "User not found"})
    }
}

const userVerifyResetPasswordController = {
    verifyResetPassword: verifyResetPassword
};

export default userVerifyResetPasswordController;