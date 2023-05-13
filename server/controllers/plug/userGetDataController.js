import User from '../../models/User.js';

const userData = async (req, res) => {

    const user = await User.find();
    
    res.json(user);
}

const userGetDataController = {
    userData: userData
};

export default userGetDataController;