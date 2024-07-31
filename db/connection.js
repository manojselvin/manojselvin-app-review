const mongoose = require('mongoose');
const logger = require('../config/logger');

// Connect to MongoDB
mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`, { authSource: "admin" });

logger.info(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`)

// Get the default connection
const db = mongoose.connection;

// Handle connection events
db.on('error', logger.error.bind(console, 'connection error:'));
db.once('open', function () {
    logger.info('Connected to MongoDB');
});

// Close the connection when your app terminates
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        logger.info('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});