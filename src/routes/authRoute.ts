import express from 'express';

const { register, userSignIn } = require('../controllers/authController');

const router = express.Router();

router.route('/register').post(register);
router.route('/sign-in').post(userSignIn);
// router.route('/sign-in').post(userSignIn);

export default router;
