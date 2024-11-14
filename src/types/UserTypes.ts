import { Document } from 'mongoose';
import { Request } from 'express';

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	birthDate: Date;
	userName: string;
	isAdmin: boolean;
	email: string;
	city: string;
	country: string;
	password: string;
	passwordConfirm: string;
}

export interface IUserRequest extends Request {
	user: { userId: string; isAdmin?: boolean };
	body: IUser;
}

// export interface IUserSignIn {
// 	email: string;
// 	password: string;
// }
// export interface IUserSignInRequest extends Request {
// 	user: { userId: string };
// 	body: IUserSignIn;
// }
