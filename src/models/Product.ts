import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../types/ProductTypes';

const productSchema: Schema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		category: {
			type: String,
			required: true,
			enum: [
				'African Attire',
				'Casual Wear',
				'Corporate Wear',
				'Shoes',
				'Bags',
				'Accessories',
			],
		},
		isCustom: { type: Boolean, default: false },
		size: [{ type: String }], // Example: ['S', 'M', 'L', 'XL']
		color: [{ type: String }], // Example: ['Red', 'Blue', 'Green']
		price: { type: Number, required: true },
		stock: { type: Number, required: true, default: 0 },
		images: [{ type: String, required: true }], // Array of image URLs
		brand: { type: String }, // Optional field for brands
		rating: { type: Number, default: 0 }, // Average rating for the product
		reviews: { type: Number, default: 0 }, // Number of reviews
	},
	{ timestamps: true }, // Automatically manages createdAt and updatedAt
);

export const Product = mongoose.model<IProduct>('Product', productSchema);

// export default Product;
