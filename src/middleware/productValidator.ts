import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { IUser } from '../types/UserTypes';
import { StatusCodes } from 'http-status-codes';

// Joi schema for validating a product

export const productValidationSchema = Joi.object({
	name: Joi.string().required(),
	description: Joi.string().required(),
	category: Joi.string()
		.valid(
			'African Attire',
			'Casual Wear',
			'Corporate Wear',
			'Shoes',
			'Bags',
			'Accessories',
		)
		.required(),
	isCustom: Joi.boolean().default(false),
	size: Joi.array().items(Joi.string()).optional(), // Sizes like ['S', 'M', 'L', 'XL']
	color: Joi.array().items(Joi.string()).optional(), // Colors like ['Red', 'Blue', 'Green']
	price: Joi.number().positive().required(),
	stock: Joi.number().integer().min(0).required(),
	images: Joi.array().items(Joi.string().uri()).required(), // Array of image URLs
	brand: Joi.string().optional(), // Optional brand name
	rating: Joi.number().min(0).max(5).optional(), // Rating between 0 and 5
	reviews: Joi.number().integer().optional(), // Number of reviews
});

// Middleware function to validate product data
export const validateProduct = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	const { error } = productValidationSchema.validate(req.body, {
		abortEarly: false,
	});

	if (error) {
		res.status(StatusCodes.BAD_REQUEST).json({
			message: 'Validation error',
			details: error.details.map((err) => err.message),
		});
	} else {
		next(); // Continue if validation passes
	}
};
