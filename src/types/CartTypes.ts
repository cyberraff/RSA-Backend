import {Document} from 'mongoose';
import {IProduct} from './ProductTypes'; // Assuming you have a product interface
import {IUser} from './UserTypes';
import {Request} from "express"; // Assuming you have a user interface
// import {ICartItem} from './cartItemInterface'; // The cart item interface

export interface ICartItem {
	product: IProduct | string; // Reference to Product model or just a product ID (string)
	quantity: number;
}


export interface ICart extends Document {
	user: IUser | string; // Reference to User model or just a user ID (string)
	cartItems: ICartItem[]; // Array of cart items
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ICartRequest extends Request {
	user: { userId: string; isAdmin?: boolean };
	body: IUser;
}
