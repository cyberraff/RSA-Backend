import Joi from 'joi';
import { IUser } from '../types/UserTypes';

// Joi schema for validating user registration

export const validateUserSignUp = (user: IUser) => {
	const schema = Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		userName: Joi.string().required(),
		isAdmin: Joi.boolean().default(false).required(),
		birthDate: Joi.date().required(),
		city: Joi.string().required(),
		country: Joi.string().required(),
		email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
			.required(),
		password: Joi.string().min(8).required(),
		passwordConfirm: Joi.string()
			.valid(Joi.ref('password'))
			.required()
			.error(new Error('Passwords do not match')),
	});
	return schema.validate(user);
};

// Joi schema for validating user sign-in

export const validateUserSignIn = (user: IUser) => {
	const schema = Joi.object({
		email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
			.required(),
		password: Joi.string().min(8).required(),
	});
	return schema.validate(user);
};
