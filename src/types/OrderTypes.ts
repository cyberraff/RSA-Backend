import { Types } from 'mongoose';

interface IOrderItem {
	product: Types.ObjectId; // Reference to the product
	name: string;
	quantity: number;
	price: number;
	image: string;
}

interface IShippingAddress {
	address: string;
	city: string;
	postalCode: string;
	country: string;
}

interface IPaymentResult {
	id?: string; // Optional because it's not required initially
	status?: string;
	update_time?: string;
	email_address?: string;
}

export interface IOrder {
	user: Types.ObjectId; // Reference to the User model
	orderItems: IOrderItem[]; // Array of order items
	shippingAddress: IShippingAddress; // Sub-document for shipping address
	paymentMethod: string; // E.g., 'PayPal', 'Credit Card'
	paymentResult?: IPaymentResult; // Optional because it might not be filled immediately
	itemsPrice: number;
	shippingPrice: number;
	taxPrice: number;
	totalPrice: number;
	isPaid: boolean;
	paidAt?: Date;
	isDelivered: boolean;
	deliveredAt?: Date;
	createdAt?: Date;
}
