import User from '../../models/User.js';

const activityShow = (req, res) => {
    res.json('Hello from register');
}

const activityAllController = {
    activityShow: activityShow
};

export default activityAllController;