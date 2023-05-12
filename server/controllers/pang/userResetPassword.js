import User from '../../models/User.js';

const resetPassword = (req, res) => {
    res.json('Hello from login');
}

const userResetPassword = {
    resetPassword: resetPassword
};

export default userResetPassword;