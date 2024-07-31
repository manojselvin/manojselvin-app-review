const logger = require("../config/logger");

const logEndpoint = (req, res, next) => {
    logger.info(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
};

module.exports = logEndpoint;