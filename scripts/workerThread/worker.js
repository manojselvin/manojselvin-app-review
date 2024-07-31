const { parentPort } = require('worker_threads');
const logger = require('../../config/logger');

function fibonacci(n) {
    logger.info("here", result);
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Listen for messages from the main thread
parentPort.on('message', (n) => {
    const result = fibonacci(n);
    logger.info("here", result);
    // Send the result back to the main thread
    parentPort.postMessage(result);
});