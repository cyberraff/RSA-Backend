import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/User';
import { IUser, IUserRequest } from '../types/UserTypes';
import {
	validateUserSignUp,
	validateUserSignIn,
} from '../middleware/validators';

export const register = async (req: IUserRequest, res: Response) => {
	try {
		const data = req.body;
		const {
			userName,
			email,
			password,
			firstName,
			lastName,
			passwordConfirm,
			country,
			city,
			birthDate,
		} = data;

		const { error } = validateUserSignUp(data);
		if (error) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: error.details[0].message });
		}
		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		// // Hash password
		// const salt = await bcrypt.genSalt(10);
		// const hashedPassword = await bcrypt.hash(password, salt);

		// Create new user
		const user = await User.create({
			...req.body,
		});
		const token = jwt.sign(
			{ userId: user._id },
			process.env.JWT_SECRET as string,
			{
				expiresIn: '1h',
			},
		);

		res.status(StatusCodes.CREATED).json({
			message: 'User registered successfully',
			user: {
				token,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				id: user._id,
			},
		});
	} catch (error) {
		const errorMessage =
			error instanceof Error
				? error.message
				: 'An unknown error occurred';
		res.status(500).json({ message: errorMessage });
	}
};

export const userSignIn = async (req: IUserRequest, res: Response) => {
	try {
		const data = req.body;
		const { email, password } = data;
		const { error } = validateUserSignIn(data);
		if (error) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: error.details[0].message, error });
		}

		if (!email || !password) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				statusCode: StatusCodes.BAD_REQUEST,
				errors: {
					resource: req.body,
					message: 'Please provide email and password',
				},
			});
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).json({
				errors: {
					resource: req.body,
					message: 'Account with email or password not found',
				},
			});
		}
		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) {
			return res.status(StatusCodes.NOT_FOUND).json({
				errors: {
					resource: req.body,
					message: 'Account with email or password not found',
				},
			});
		}

		const token = jwt.sign(
			{ userId: user._id },
			process.env.JWT_SECRET as string,
			{
				expiresIn: '1h',
			},
		);
		res.status(StatusCodes.OK).json({
			message: 'User successfully signed in.',
			user: {
				token,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				id: user._id,
			},
		});

		// catch error
	} catch (error) {
		const errorMessage =
			error instanceof Error
				? error.message
				: 'An unknown error occurred';
		res.status(500).json({ message: errorMessage });
	}
};

// export const login = async (req: Request, res: Response) => {
// 	try {
// 		const { email, password } = req.body;

// 		// Check if user exists
// 		const user = await User.findOne({ email });
// 		if (!user) {
// 			return res.status(400).json({ message: 'Invalid credentials' });
// 		}

// 		// Check password
// 		const isMatch = await bcrypt.compare(password, user.password);
// 		if (!isMatch) {
// 			return res.status(400).json({ message: 'Invalid credentials' });
// 		}

// 		// Generate JWT
// 		const token = jwt.sign(
// 			{ userId: user._id },
// 			process.env.JWT_SECRET as string,
// 			{
// 				expiresIn: '1h',
// 			},
// 		);

// 		res.json({ token });
// 	} catch (error) {
// 		res.status(500).json({ message: 'Server error' });
// 	}
// };

// export const getProfile = async (req: Request, res: Response) => {
// 	try {
// 		const user = await User.findById(req.userId).select('-password');
// 		if (!user) {
// 			return res.status(404).json({ message: 'User not found' });
// 		}
// 		res.json(user);
// 	} catch (error) {
// 		res.status(500).json({ message: 'Server error' });
// 	}
// };
