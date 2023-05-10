import Activity from '../models/Activity.js';
// Define variable acctivityController for export function controller
const activityController = {};

activityController.index = async (req, res) => {
    const activities = await Activity.find();
    res.json(activities);
}

activityController.hello = (req, res) => {
    res.json('Hello');
}

activityController.test = (req, res) => {
    res.json('test');
}

export default activityController;