import Activity from "../../models/Activity.js";

//http://localhost:8080/activities/user/1234 -> 1234 === user_id
const activityShow = (req, res) => {
	const { id } = req.params;

	Activity.find({ user_id: id })
		.then((activities) => res.json(activities))
		.catch((err) => res.status(400).json({ error: "Something Went Wrong" }));
};

const activityAllController = {
	activityShow: activityShow,
};

export default activityAllController;
