import User from '../../models/User.js';

const register = (req, res) => {
    res.json('Hello from register');
}

const userRegisterController = {
    register: register
};

export default userRegisterController;