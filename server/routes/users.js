import express from 'express';
import userRegisterController from '../controllers/plug/userRegisterController.js';
import userLoginController from '../controllers/plug/userLoginController.js';
import userVerifyResetPasswordController from '../controllers/pang/userVerifyResetPasswordController.js';
import userResetPassword from '../controllers/pang/userResetPassword.js';
import userEditProfileController from '../controllers/toey/userEditProfileController.js';
import userUpdateGoalWeightController from '../controllers/vee/userUpdateGoalWeightController.js';
import userGoalSuccessController from '../controllers/vee/userGoalSuccessController.js';
import userGetDataController from '../controllers/plug/userGetDataController.js';

const router = express.Router();

/* 
    GET
*/
// User Login
// http://127.0.0.1:8080/users/login
router.get('/login', userLoginController.login);
// Get user data
router.get('/user/:id', userGetDataController.userData);
// Goal success.
router.get('/goal-success/:id', userGoalSuccessController.checkGoalSuccess);
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