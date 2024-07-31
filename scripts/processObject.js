const logger = require("../config/logger");

logger.info('Node.js version:', process.version);
logger.info('Environment variables:', process.env);

logger.info('Memory usage:', process.memoryUsage());

process.on('exit', (code) => {
    logger.info(`About to exit with code: ${code}`);
});

// Exiting the process with code 0
process.exit(0);
