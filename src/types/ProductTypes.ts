import { Document } from 'mongoose';
import { Request } from 'express';

export interface IProduct extends Document {
	name: string;
	description: string;
	category: string;
	isCustom: boolean;
	size: string[];
	color: string[];
	price: number;
	stock: number;
	images: string[];
	brand?: string;
	rating?: number;
	reviews?: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface IProductRequest extends Request {
	body: IProduct;
}
