const { Worker } = require('worker_threads');
const logger = require('../../config/logger');

// Function to run the worker thread
function runWorkerThread(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}

// Using worker thread to call the CPU intensive task, which in case is Fibonacci
async function main() {
    const number = 32; // CPU-intensive task input
    logger.info(`Calculating Fibonacci of ${number} in a worker thread...`);

    try {
        const result = await runWorkerThread(number);
        logger.info(`Fibonacci of ${number} is ${result}`);
    } catch (error) {
        logger.error(`Error: ${error.message}`);
    }
}

main();