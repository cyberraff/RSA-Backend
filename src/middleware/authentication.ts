import express, { Application, Request, Response, NextFunction } from 'express';
const User = require('../models/User');
const jwt = require('jsonwebtoken');
import { IUser, IUserRequest } from '../types/UserTypes';

export const authenticateUser = async (
	req: IUserRequest,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer')) {
		return res.json({ msg: 'Authentication invalid' });
	}
	const token = authHeader.split(' ')[1];

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = { userId: payload.userId };
		next();
	} catch (error) {
		console.log(error);
		res.json({ msg: 'Authentication is not valid at all' });
	}
};

// Middleware to restrict access to admins
export const isAdmin = (
	req: IUserRequest,
	res: Response,
	next: NextFunction,
) => {
	if (req.user && req.user.isAdmin) {
		next(); // If user is admin, proceed to the next middleware
	} else {
		return res.status(403).json({ message: 'Admin access only' });
	}
};
