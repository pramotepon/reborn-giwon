import User from '../../models/User.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_KEY;

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const chkPass = bcrypt.compareSync(password, user.password);
        if(chkPass){
            jwt.sign({ email: user.email, id: user._id }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user);
            });
        }else{
            res.status(422).json('Pass failed');
        }
    }else{
        res.json('Login failed');
    }
}

const userLoginController = {
    login: login
};

export default userLoginController;