import User from '../../models/User.js';
import bcrypt from 'bcryptjs'
import createToken from '../../utils/generateToken.js';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const error = new Error();
        if (!email || !password) {
            error.message = "Email or Password invalid";
            error.status_code = 422;
            throw error;
        }
        const user = await User.findOne({ email });
        if (user) {
            const chkPass = bcrypt.compareSync(password, user.password);
            if (chkPass) {
                const token = createToken(user._id);
                res.json({ token });
            } else {
                error.message = "You have entered an invalid email or password";
                error.status_code = 422;
                throw error;
            }
        } else {
            error.message = "You have entered an invalid email or password";
            error.status_code = 422;
            throw error;
        }
    } catch (e) {
        res.json({ error: e });
    }
}

const userLoginController = {
    login: login
};

export default userLoginController;