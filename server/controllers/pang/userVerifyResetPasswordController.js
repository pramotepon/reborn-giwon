import User from '../../models/User.js';

const verifyResetPassword = (req, res) => {
    res.json('Hello from login');
}

const userVerifyResetPasswordController = {
    verifyResetPassword: verifyResetPassword
};

export default userVerifyResetPasswordController;