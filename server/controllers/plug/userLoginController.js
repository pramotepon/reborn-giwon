import User from '../../models/User.js';
import bcrypt from 'bcryptjs'
import createToken from '../../utils/generateToken.js';

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const chkPass = bcrypt.compareSync(password, user.password);
        if (chkPass) {
            const token = createToken(user._id);
            res.json({ email, token });
        } else {
            res.status(422).json('You have entered an invalid username or password');
        }
    } else {
        res.status(422).json('You have entered an invalid username or password');
    }
}

const userLoginController = {
    login: login
};

export default userLoginController;