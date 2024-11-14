import mongoose from 'mongoose';
import { IOrder } from '../types/OrderTypes';

// Order Item Schema (sub-document)
const orderItemSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: true,
	},
	name: { type: String, required: true },
	quantity: { type: Number, required: true },
	price: { type: Number, required: true },
});

// Shipping Address Schema (sub-document)
const shippingAddressSchema = new mongoose.Schema({
	address: { type: String, required: true },
	city: { type: String, required: true },
	postalCode: { type: String, required: true },
	country: { type: String, required: true },
});

// Order Schema
const orderSchema = new mongoose.Schema({
	// Reference to the User model
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},

	// Order items (array of orderItemSchema)
	orderItems: [orderItemSchema],

	// Shipping address (sub-document)
	shippingAddress: shippingAddressSchema,

	// Payment info
	paymentMethod: { type: String, required: true }, // e.g., 'PayPal', 'Credit Card'
	paymentResult: {
		id: { type: String }, // transaction ID from payment processor
		status: { type: String }, // status of payment
		update_time: { type: String }, // when payment was processed
		email_address: { type: String }, // payment email address
	},

	// Price details
	itemsPrice: { type: Number, required: true, default: 0.0 }, // total price of items
	shippingPrice: { type: Number, required: true, default: 0.0 }, // cost of shipping
	taxPrice: { type: Number, required: true, default: 0.0 }, // tax on the order
	totalPrice: { type: Number, required: true, default: 0.0 }, // final price

	// Order status
	isPaid: { type: Boolean, required: true, default: false }, // if payment is completed
	paidAt: { type: Date }, // timestamp of payment
	isDelivered: { type: Boolean, required: true, default: false }, // if order is delivered
	deliveredAt: { type: Date }, // timestamp of delivery

	// Timestamps
	createdAt: { type: Date, default: Date.now },
});

// Creating the Order model
export const Order = mongoose.model<IOrder>('Order', orderSchema);
