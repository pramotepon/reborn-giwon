import Activity from "../../models/Activity.js";
import User from "../../models/User.js";

//http://localhost:8080/activities/add/:id

const addActivity = (req, res) => {
	const {
		user_id,
		activity_name,
		activity_type,
		calendar,
		duration,
		description,
		image,
	} = req.body;

	const newActivity = new Activity({
		user_id,
		activity_name,
		activity_type,
		calendar,
		duration,
		description,
		image,
	});

	newActivity
		.save()
		.then(() => res.json("Activity added!"))
		.catch((err) => res.status(400).json({ error: "Something Went Wrong" }));
};

const activityAddController = {
	addActivity: addActivity,
};

export default activityAddController;

// here is my example of how to add a new activity in postman
// {
//     "user_id": "60b9b0b3b3b3b3b3b3b3b3b3",

//     "activity_name": "test",
//     "activity_type": "test",
//     "calendar": "test",
//     "duration": "test",
//     "description": "test",
//     "image": "test"
// }
