const mongoose = require('mongoose');

/**
 * Connects to the database using the provided URL.
 *
 * @param {string} url - The URL of the database.
 * @returns {Promise} - A promise that resolves when the connection is established.
 */
export const connectDb = (url: string) => {
	return mongoose.connect(url, {
		// Enable the new URL parser
		// useNewUrlParser: true,
		// Enable the new unified topology
		// useUnifiedTopology: true,
	});
};

// module.exports = connectDb;
