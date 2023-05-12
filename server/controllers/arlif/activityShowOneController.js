import User from '../../models/User.js';

const activityShowOne = (req, res) => {
    res.json('Hello from register');
}

const activityShowOneController = {
    activityShowOne: activityShowOne
};

export default activityShowOneController;