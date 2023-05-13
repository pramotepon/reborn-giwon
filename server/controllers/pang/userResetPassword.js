import User from "../../models/User.js";

const resetPassword = async (req, res) => {
	let id = req.params.id;
	const filter = { _id: id };
	const update = { age: 59 };

	let doc = await User.findOneAndUpdate(filter, update);
	res.json("Hello");
};

const userResetPassword = {
	resetPassword: resetPassword,
};

export default userResetPassword;
