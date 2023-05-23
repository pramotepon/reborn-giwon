import express from 'express';
import UserController from '../controllers/UserController.js';
const router = express.Router();

/* 
    GET
*/
// Get user data
router.get('/profile', UserController.getData);
// Goal success.
router.get('/goal-success/:id', UserController.goalCheck);

/* 
POST
*/
// User Check access Password reset
router.post('/verify-before-reset-password', UserController.accessResetPassword);
// User register
router.post('/register', UserController.register);
// User Login
// http://127.0.0.1:8080/users/login
router.post('/login', UserController.login);
/* 
    PUT
*/
// User reset password
router.put('/password-reset/', UserController.resetPassword);
// Edit user profile
router.put('/edit-profile', UserController.update);
// User update goal weight
router.put('/goal-weight-update/:id', UserController.updateGoal);

export default router;