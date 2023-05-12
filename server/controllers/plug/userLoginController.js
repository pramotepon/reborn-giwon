import User from '../../models/User.js';

const login = (req, res) => {
    res.json('Hello from login');
}

const userLoginController = {
    login: login
};

export default userLoginController;