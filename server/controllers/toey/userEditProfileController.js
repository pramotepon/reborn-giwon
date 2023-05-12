import User from '../../models/User.js';

// const userUpdate = (req, res) => {
//     res.json({
//     displayName: "Hello Name",
//     height: 180,
//     weight: 78,
//     gender:  "prefer not to say",
//     image: "image.png",
//     });
// }

const userUpdate = async (req, res) => {
    const { displayName, height, weight, gender, image } = req.body;
    const userId = req.params.id;

    try {
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { displayName, height, weight, gender, image },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// const userUpdate = async (req, res) => {
//     const { id } = req.params; // get the user id from the request parameters
//     const { displayName, height, weight, gender, image } = req.body; // get the updated user data from the request body

//     try {
//         // find the user by id and update its properties
//         const updatedUser = await User.findByIdAndUpdate(id, { displayName, height, weight, gender, image }, { new: true });
//         res.status(200).json(updatedUser); // send the updated user object as the response
//     } catch (error) {
//         res.status(500).json({ error: error.message }); // handle any errors that occur during the update process
//     }
// };

const userEditProfileController = {
    userUpdate: userUpdate
};

export default userEditProfileController;