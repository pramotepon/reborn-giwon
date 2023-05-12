import Activity from '../../models/Activity.js';

const activityUpdate = async (req, res) => {
    // res.json('Hello from register');
    const { activity_name, activity_type, calendar, duration, description, image } = req.body;
    const activityId = req.params.id;

    try {
        const activity = await Activity.findOneAndUpdate(
          { _id: activityId },
          { activity_name, activity_type, calendar, duration, description, image },
          { new: true }
        );
        if (!activity) {
          return res.status(404).json({ message: 'Activity not found' });
        }
        res.json(activity);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
};

const activityEditController = {
    activityUpdate: activityUpdate
};

export default activityEditController;