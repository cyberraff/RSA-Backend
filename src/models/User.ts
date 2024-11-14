import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from '../types/UserTypes';

dotenv.config();

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'first name is required.'],
	},
	lastName: {
		type: String,
		required: [true, 'last name is required.'],
	},
	userName: {
		type: String,
		required: [true, 'userName is required.'],
		unique: true,
		lowercase: true,
	},
	isAdmin: { type: Boolean, required: true, default: false },
	email: {
		type: String,
		required: [true, 'email is required.'],
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minlength: [8, 'Password must be at least 8 characters long'],
	},
	passwordConfirm: {
		type: String,
		required: true,
	},
	birthDate: {
		type: Date,
		required: [true, 'birth date is required.'],
	},
	city: {
		type: String,
		required: [true, 'city is required.'],
	},
	country: {
		type: String,
		required: [true, 'country is required.'],
	},

	// Cart reference
	cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },

	// Array of order reference
	orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
});

// Hash the password before saving
UserSchema.pre('save', async function () {
	if (!this.isModified('password')) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.pre('save', async function () {
	// const salt = await bcrypt.genSalt(10);
	// this.passwordConfirm = await bcrypt.hash(this.passwordConfirm, salt);
	if (this.isModified('passwordConfirm') && this.passwordConfirm) {
		const salt = await bcrypt.genSalt(10);
		this.passwordConfirm = await bcrypt.hash(this.passwordConfirm, salt);
	}
});

UserSchema.methods.createJWT = function () {
	if (process.env.JWT_SECRET && process.env.JWT_LIFETIME) {
		return jwt.sign(
			{ userId: this._id, name: this.firstName },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_LIFETIME },
		);
	}
	throw new Error('JWT_SECRET or JWT_LIFETIME is not defined');
};

// Password comparison method for authentication
UserSchema.methods.comparePassword = async function (password: string) {
	try {
		const isMatch = await bcrypt.compare(password, this.password);
		return isMatch;
	} catch (err) {
		throw new Error(err instanceof Error ? err.message : String(err));
	}
};
export const User = mongoose.model<IUser>('user', UserSchema);
