import User from "../../models/User.js";
import bcrypt from "bcryptjs";

const bcryptSalt = bcrypt.genSaltSync(10);
const resetPassword = async (req, res) => {
    let body = req.body;
    const filter = { email: body.email};
    const update = { password: bcrypt.hashSync(body.password, bcryptSalt) };

    let user = await User.findOneAndUpdate(filter, update);
    if (user) {
        res.json({"status": "success", "message" : "Password reset successfully"})
    }
    else {
        res.status(401).json({"status": "error", "message" : "Email mismatch"})
    }
}

const userResetPassword = {
    resetPassword: resetPassword
};

export default userResetPassword;
