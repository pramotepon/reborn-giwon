import User from '../../models/User.js';

const checkGoalSuccess = (req, res) => {
    res.json('Hello from register');
}

const userGoalSuccessController = {
    checkGoalSuccess: checkGoalSuccess
};

export default userGoalSuccessController;