// import { Router } from 'express';
import express from 'express';

import {
	createProduct,
	getAllProducts,
	getProductById,
	updateProduct,
	deleteProduct,
	getProductsByCategory,
} from '../controllers/productController';

const router = express.Router();

router.route('/').post(createProduct).get(getAllProducts);
router.route('/category/:category').get(getProductsByCategory);
router
	.route('/:id')
	.get(getProductById)
	.put(updateProduct)
	.delete(deleteProduct);

export default router;
