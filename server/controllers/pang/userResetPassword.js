import User from '../../models/User.js';


const resetPassword = async (req, res) => {
    let body = req.body;
    const filter = { email: body.email};
    const update = { password: body.password };

    let user = await User.findOneAndUpdate(filter, update);
    if (!user) {
        res.status(401).json({"status": "error", "message" : "Email mismatch"})
    }
    else {
        res.json({"status": "success", "message" : "Password reset successfully"})
    }

}


const userResetPassword = {
    resetPassword: resetPassword
};

export default userResetPassword;