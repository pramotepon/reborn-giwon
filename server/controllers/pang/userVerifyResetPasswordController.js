import User from '../../models/User.js';
import { ObjectId } from 'mongoose';

const verifyResetPassword = async (req, res) => {
    let body = req.body;
    let id = req.params.id;
    let user = await User.findById(id);
    if (body.email === user.email && body.height === user.height 
        && body.weight === user.weight && body.gender === user.gender) {
        res.json(
            {
                "status": "success",
                "message" : "You can reset password"
            }
        )
    }
    else {
        res.status(401).json(
            {
                "status": "error",
                "message" : "You can't reset password"
            }
        )
    }
}

const userVerifyResetPasswordController = {
    verifyResetPassword: verifyResetPassword
};

export default userVerifyResetPasswordController;