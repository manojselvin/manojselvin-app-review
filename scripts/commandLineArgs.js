const logger = require("../config/logger");

// Getting command-line arguments
const args = process.argv.slice(2);

if (args.length < 2) {
    logger.info('Please provide two numbers as arguments');
    process.exit(1);
}

const num1 = parseFloat(args[0]);
const num2 = parseFloat(args[1]);

if (isNaN(num1) || isNaN(num2)) {
    logger.info('Both arguments should be numbers');
    process.exit(1);
}

logger.info(`Sum of ${num1} and ${num2} is ${num1 + num2}`);
