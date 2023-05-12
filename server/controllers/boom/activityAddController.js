import User from '../../models/User.js';

const addActivity = (req, res) => {
    res.json('Hello from register');
}

const activityAddController = {
    addActivity: addActivity
};

export default activityAddController;