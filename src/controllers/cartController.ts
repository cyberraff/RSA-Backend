import {Request, Response} from 'express';
import {Cart} from '../models/Cart';
import {User} from '../models/User';
import {Product} from "../models/Product";
import {StatusCodes} from "http-status-codes";
import {ICartRequest} from "../types/CartTypes";

export const addToCart = async (req: ICartRequest, res: Response) => {

	try {
		const userId = req.user._id
		const {productId, quantity} = req.body

		// find the product to ensure it exist
		const product = await Product.findById((productId))
		if (!product) {
			return res.status(StatusCodes.NOT_FOUND).json({message: 'product not found'})
		}

		// find the user's cart or create a new one
		let cart = await Cart.findOne({user: userId})
		if (!cart) {
			cart = new Cart({user: userId, cartItems: []});
		}

		// Check if the product is already in the cart
		const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId)

		if (itemIndex > -1) {
			// update quantity if product exists
			cart.cartItems[itemIndex].quantity += quantity
		} else {
			// add a new product
			cart.cartItems.push({product: productId, quantity})
		}

		await cart.save()
		return res.status(StatusCodes.OK).json({message: 'product added to cart', cart})
	} catch (error) {
		// return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message})

		const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: errorMessage})
	}


	// const cart = await Cart.findOne({user: userId});
	//
	// if (!cart) {
	// 	// create new cart
	// 	const newCart = new Cart({
	// 		user: userId,
	// 		cartItems: [{product: productId, quantity}],
	// 	});
	// 	await newCart.save();
	// 	await User.findByIdAndUpdate(userId, {cart: newCart._id});
	// } else {
	// 	const itemIndex = cart.cartItems.findIndex(
	// 		(item) => item.product.toString() === productId
	// 	);
	//
	// 	if (itemIndex > -1) {
	// 		cart.cartItems[itemIndex].quantity += quantity;
	// 	} else {
	// 		cart.cartItems.push({product: productId, quantity});
	// 	}
	// }
};

