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

// READ (Get user by ID)
export const getUserById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);

		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).json({
				message: 'User not found',
			});
		}

		res.status(StatusCodes.OK).json({
			message: 'User found',
			user: {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				userName: user.userName,
				city: user.city,
				country: user.country,
			},
		});
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: 'An error occurred',
			error: error instanceof Error ? error.message : 'Unknown error',
		});
	}
};

// UPDATE (Update user by ID)
export const updateUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const data = req.body;

		// Only allow updating certain fields (firstName, lastName, etc.)
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{
				$set: {
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					city: data.city,
					country: data.country,
				},
			},
			{ new: true, runValidators: true },
		);

		if (!updatedUser) {
			return res.status(StatusCodes.NOT_FOUND).json({
				message: 'User not found',
			});
		}

		res.status(StatusCodes.OK).json({
			message: 'User updated successfully',
			user: updatedUser,
		});
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: 'An error occurred',
			error: error instanceof Error ? error.message : 'Unknown error',
		});
	}
};

// DELETE (Delete user by ID)
export const deleteUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const user = await User.findByIdAndDelete(id);

		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).json({
				message: 'User not found',
			});
		}

		res.status(StatusCodes.OK).json({
			message: 'User deleted successfully',
		});
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: 'An error occurred',
			error: error instanceof Error ? error.message : 'Unknown error',
		});
	}
};
