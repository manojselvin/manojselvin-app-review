// Import the events module
const EventEmitter = require('events');
const logger = require('../config/logger');

// Create an instance of EventEmitter
const myEmitter = new EventEmitter();

// Register an event listener for the 'data' event (save data)
myEmitter.on('data', (msg) => {
    // demoing saved data by logging saved as text with msg
    logger.info(`${msg}: Saved!`);
});

// Register another event listener for the 'data' event (print data) which will print data
myEmitter.on('data', (msg) => {
    logger.info(`${msg}: Printed!`);
});

// Register an event listener for the 'deleteData' event
myEmitter.on('deleteMsg', (msg) => {
    logger.info(`${msg}: Deleted!`);
});

let msg = 'Emiting msg from event....';

// Emit the message using 'data' event
myEmitter.emit('data', msg);

// Emit the msg to be deleted using 'deleteMsg' event
myEmitter.emit('deleteMsg', msg);
