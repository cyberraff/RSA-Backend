import { Request, Response } from 'express';
import { Product } from '../models/Product'; // Assuming you have your product model in this path
import { StatusCodes } from 'http-status-codes';
import { IProductRequest } from '../types/ProductTypes';

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (
	req: IProductRequest,
	res: Response,
): Promise<void> => {
	try {
		const product = new Product(req.body); // req.body must contain the validated product data

		const createdProduct = await product.save();
		res.status(201).json(createdProduct);
	} catch (error) {
		const errorMessage =
			error instanceof Error
				? error.message
				: 'An unknown error occurred';
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: errorMessage,
		});
	}
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getAllProducts = async (req: IProductRequest, res: Response) => {
	try {
		const products = await Product.find({});
		if (!products) {
			return res.status(StatusCodes.NOT_FOUND).json({
				message: 'Products not found',
			});
		}
		const formattedProducts = products.map((product) => ({
			product: {
				id: product._id,
				name: product.name,
				desc: product.description,
				category: product.category,
				size: product.size, // This is an array, so you might want to join it into a string if needed
				color: product.color, // Same here, depending on how you want to display it
				price: product.price,
			},
		}));
		res.status(StatusCodes.OK).json({
			message: 'All products.',
			formattedProducts,
			// product: {
			// 	name: products.name,
			// 	desc: products.description,
			// 	category: products.category,
			// 	size: products.size,
			// 	color: products.color,
			// 	price: products.price,
			// },
		});
	} catch (error) {
		const errorMessage =
			error instanceof Error
				? error.message
				: 'An unknown error occurred';
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: errorMessage,
		});
	}
};

// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req: Request, res: Response) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(StatusCodes.NOT_FOUND).json({
				message: 'Products not found',
			});
		}
		res.status(StatusCodes.OK).json({
			product: {
				id: product._id,
				name: product.name,
				desc: product.description,
				category: product.category,
				size: product.size, // This is an array, so you might want to join it into a string if needed
				color: product.color, // Same here, depending on how you want to display it
				price: product.price,
			},
		});
	} catch (error) {
		const errorMessage =
			error instanceof Error
				? error.message
				: 'An unknown error occurred';
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: errorMessage,
		});
	}
};
export const getProductsByCategory = async (req: Request, res: Response) => {
	try {
		const { category } = req.params;
		const product = await Product.find({ category: category });

		if (product.length === 0) {
			return res.status(StatusCodes.NOT_FOUND).json({
				message: 'Products not found',
			});
		}
		res.status(StatusCodes.OK).json({
			product,
			// product: {
			// 	id: product._id,
			// 	name: product.name,
			// 	desc: product.description,
			// 	category: product.category,
			// 	size: product.size, // This is an array, so you might want to join it into a string if needed
			// 	color: product.color, // Same here, depending on how you want to display it
			// 	price: product.price,
			// },
		});
	} catch (error) {
		const errorMessage =
			error instanceof Error
				? error.message
				: 'An unknown error occurred';
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: errorMessage,
		});
	}
};

// @desc    Update a product by ID
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const data = req.body;

		const updatedProduct = await Product.findByIdAndUpdate(
			id,
			{
				$set: {
					name: data.name,
					description: data.description,
					category: data.category,
					isCustom: data.isCustom,
					size: data.size,
					color: data.color,
					price: data.price,
					stock: data.stock,
					images: data.images,
					brand: data.brand,
				},
			},
			{ new: true, runValidators: true },
		);
		if (!updatedProduct) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ message: 'Product not found' });
		}

		res.status(StatusCodes.OK).json({
			message: 'Product updated successfully',
			product: updatedProduct,
		});
	} catch (error) {
		const errorMessage =
			error instanceof Error
				? error.message
				: 'An unknown error occurred';
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: errorMessage,
		});
	}
};

// @desc    Delete a product by ID
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const data = req.body;
		const product = await Product.findByIdAndDelete(req.params.id);

		if (!product) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ message: 'Product not found' });
		}

		res.status(StatusCodes.OK).json({
			message: 'Product deleted successfully',
			product: product,
		});
		// if (product) {
		// 	await product.remove();
		// 	res.json({ message: 'Product removed' });
		// } else {
		// 	res.status(404).json({ message: 'Product not found' });
		// }
	} catch (error) {
		const errorMessage =
			error instanceof Error
				? error.message
				: 'An unknown error occurred';
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: errorMessage,
		});
	}
};
