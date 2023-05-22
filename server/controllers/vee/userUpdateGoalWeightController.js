import User from "../../models/User.js";

// ลองเขียนเอง

const userUpdateGoalWeight = async (req, res) => {
	const userId = req.params.id;
	const { goal } = req.body;
	console.log(goal);
	console.log(userId);

	try {
		const user = await User.findOneAndUpdate(
			{ _id: userId },
			{ goal },
			{ new: true }
		);

		//เช็ค ID user

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

const userUpdateGoalWeightController = {
	userUpdateGoalWeight,
};

export default userUpdateGoalWeightController;

//   const userUpdateGoalWeight1 = async (req, res) => {
//     const { userId, goal } = req.body;

//     try {
//       const user = await User.findById(userId);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       // Update user's goal weight
//       user.goal = goal;
//       await user.save();

//       res.json(user);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   };

//   //Find One and Update Goal

//   const userId = req.params.id;

//   user = await User.findOneAndUpdate(
//     { _id: userId },
//     { goal },
//     { new: true }
// );

//   const userUpdateGoalWeightController = {
//     userUpdateGoalWeight
//   };
