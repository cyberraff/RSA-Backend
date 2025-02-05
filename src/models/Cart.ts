import { required } from 'joi';
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: true,
	},
	quantity: { type: Number, required: true, default: 1 },
});

const cartSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	cartItems: [cartItemSchema],
	totalPrice: { type: Number, required: true, default: 0 },
});
export const Cart = mongoose.model('cart', cartSchema);
