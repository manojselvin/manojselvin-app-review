const logger = require('../config/logger');
const redis = require("redis");
const redisclient = redis.createClient({ socket: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT }, legacyMode: true });

(async () => {
    await redisclient.connect();
})();

logger.info("Connecting to the Redis");

redisclient.on("ready", () => {
    logger.info("Redis Connected!");
});

redisclient.on("error", (err) => {
    logger.error("Error in the Redis Connection", err);
});

module.exports = redisclient; 