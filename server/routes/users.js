import express from 'express';
import userRegisterController from '../controllers/plug/userRegisterController.js';
import userLoginController from '../controllers/plug/userLoginController.js';
import userVerifyResetPasswordController from '../controllers/pang/userVerifyResetPasswordController.js';
import userResetPassword from '../controllers/pang/userResetPassword.js';
import userEditProfileController from '../controllers/toey/userEditProfileController.js';
import userUpdateGoalWeightController from '../controllers/vee/userUpdateGoalWeightController.js';
import userGoalSuccessController from '../controllers/vee/userGoalSuccessController.js';

const router = express.Router();

/* 
    GET
*/
// User Login
router.get('/login', userLoginController.login);
// Goal success.
router.get('/users/login', userGoalSuccessController.checkGoalSuccess);
// User Check access Password reset
router.get('/verify-before-reset-password/:id', userVerifyResetPasswordController.verifyResetPassword);

/* 
    POST
*/
// User register
router.post('/register', userRegisterController.register);

/* 
    PUT
*/
// User reset password
router.put('/password-reset/:id', userResetPassword.resetPassword);
// Edit user profile
router.put('/edit-profile/:id', userEditProfileController.userUpdate);
// User update goal weight
router.put('/goal-weight-update/:id', userUpdateGoalWeightController.userUpdateGoalWeight);

export default router;