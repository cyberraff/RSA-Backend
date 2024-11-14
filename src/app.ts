import * as dotenv from 'dotenv';
import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoute';
import userRoutes from './routes/usersRoute';

dotenv.config();
const app: Application = express();

// connectDb
import { connectDb } from './db/connect';

//middleware

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api/v1/users', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/admin/products', productRoutes);

// Basic route
app.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.send('Hello, World !');
});

const start = async () => {
	try {
		if (process.env.MONGO_URI) {
			await connectDb(process.env.MONGO_URI);
			app.listen(port, () =>
				console.log(`Server is listening on port ${port}`),
			);
		} else {
			throw new Error(
				'MONGO_URI is not defined in the environment variables',
			);
		}
	} catch (error) {
		console.log(error);
	}
};
start();
