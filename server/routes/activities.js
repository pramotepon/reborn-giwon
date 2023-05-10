import express from 'express';
import activityController from '../controllers/activityController.js'

const router = express.Router();

// /activities/
router.get('/', activityController.index);
router.get('/hello', activityController.hello);

export default router;