import express from 'express';
import { updateUser, getUserById } from '../controllers/userController';

// const { getUserById, userSignIn } = require('../controllers/userController');

const router = express.Router();

router.route('/profile/:id').get(getUserById).put(updateUser);
// router.route('/sign-in').post(userSignIn);
// router.route('/sign-in').post(userSignIn);

export default router;
