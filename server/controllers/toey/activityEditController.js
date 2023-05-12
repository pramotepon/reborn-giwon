import User from '../../models/User.js';

const activityUpdate = (req, res) => {
    res.json('Hello from register');
}

const activityEditController = {
    activityUpdate: activityUpdate
};

export default activityEditController;