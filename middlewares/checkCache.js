const redisClient = require('../cache/redis');
const logger = require('../config/logger');

// Middleware to check cache before hitting the API
function checkCache(req, res, next) {
    logger.info("In check cache middleware");
    const key = req.originalUrl;
    redisClient.get(key, (err, data) => {
        if (err) {
            logger.error(`Error retrieving data from Redis: ${err}`);
            next(err);
        } else if (data !== null) {
            logger.info(`Cache hit: ${key}`);
            res.send(JSON.parse(data));
        } else {
            next();
        }
    });
}

module.exports = checkCache;