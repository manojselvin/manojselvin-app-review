const logger = require("../config/logger");

logger.info('Current directory:', __dirname);
logger.info('Current file:', __filename);

setTimeout(() => {
    logger.info('This message is delayed by 2 seconds');
}, 2000);