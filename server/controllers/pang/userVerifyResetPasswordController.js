import User from '../../models/User.js';
import generateToken from '../../utils/generateToken.js'
import { ObjectId } from 'mongoose';

const verifyResetPassword = async (req, res) => {
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

const userVerifyResetPasswordController = {
    verifyResetPassword: verifyResetPassword
};

export default userVerifyResetPasswordController;