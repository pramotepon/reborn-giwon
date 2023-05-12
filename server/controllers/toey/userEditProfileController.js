import User from '../../models/User.js';

const userUpdate = (req, res) => {
    res.json('Hello from register');
}

const userEditProfileController = {
    userUpdate: userUpdate
};

export default userEditProfileController;