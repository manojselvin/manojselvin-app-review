const express = require('express');
require('dotenv').config();

const app = express();

require('./db/connection');

const { fetchPostsAsyncAwait, fetchPostsPromises, fetchPostsCallbacks } = require('./scripts/asyncMethods');
const carSchema = require('./schemas/carSchema');
const carUpdateSchema = require('./schemas/carUpdateSchema');
const Car = require('./models/Car');
const logger = require('./config/logger');
const { ROLES, USER_LOGIN_DETAILS } = require('./config/constants');
const jwtSign = require('./helpers/jwtSign');
const { errorHandler, logEndpoint, verifyToken, checkRole, checkCache } = require('./middlewares');
const redisClient = require('./cache/redis');

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(logEndpoint);
app.use(errorHandler);

app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});

// API 1: API Health Check
app.get('/api/health', (req, res) => {
    res.status(200).send('OK');
});

// API 2: Greet API
app.get('/api/greet', (req, res) => {
    res.status(200).send('Hello World');
});

// API 3: Employees lisitng (No Auth or Role access needed since this is for different types of async operations)
app.get('/api/employees', async (req, res) => {

    try {
        let asyncTypes = ['asyncAwait', 'promise', 'callback'];
        let { callType = 'asyncAwait' } = req.query;

        if (!asyncTypes.includes(callType)) {
            callType = 'asyncAwait';
        }

        logger.info(`Employees API call type: ${callType}`);

        switch (callType) {
            case 'asyncAwait':
                return res.status(200).send(await fetchPostsAsyncAwait());
            case 'promise':
                fetchPostsPromises()
                    .then(data => {
                        res.status(200).send(data);
                    })
                    .catch(error => {
                        res.status(500).send(error?.message);
                    });
                return;
            case 'callback':
                fetchPostsCallbacks((data, error) => {
                    if (error) {
                        res.status(500).send(error?.message);
                    } else {
                        res.status(200).send(data);
                    }
                    return;
                });
                break;
            default:
                // Settings default to asyncAwait
                return res.status(200).send(await fetchPostsAsyncAwait());
        }
    } catch (error) {
        res.status(500).send(error?.message);
        logger.error(error);
    }
});


// API 4: Add New cars to our collection (Role Access: Only Admin)
app.post('/api/cars', verifyToken, checkRole([ROLES.ADMIN]), (req, res) => {
    try {
        // Validate input against Joi schema
        const { error, ...rest } = carSchema.validate(req.body);
        logger.error(error, rest);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        // Create a new car instance
        const newCar = new Car({
            make: req.body.make.trim(),
            model: req.body.model.trim(),
            year: req.body.year,
            price: req.body.price
        });

        // Save the new car
        newCar.save()
            .then(car => {
                logger.info(car);
                res.status(201).send(car);
            })
            .catch(err => {
                logger.error(err);
                res.status(500).send(err.message);
            });
    } catch (error) {
        res.status(500).send(error.message);
        logger.error(error);
    }
});

// API 5: Get all cars (Role Access: Open API for public access)
app.get('/api/cars', checkCache, (req, res) => {
    Car.find()
        .then(cars => {
            // Caching data for 1 hour
            redisClient.setEx(req.originalUrl, 3600, JSON.stringify(cars));
            res.status(200).send(cars);
        })
        .catch(err => {
            logger.error(err);
            res.status(500).send(err.message);
        });
});

// API 6: Get Car By Id (Role Access: Open API for public access)
app.get('/api/cars/:id', (req, res) => {
    const carId = req.params.id;

    Car.findById(carId)
        .then(car => {
            if (!car) {
                return res.status(404).send('Car not found');
            }
            // Caching data for 1 hour
            redisClient.setEx(req.originalUrl, 3600, JSON.stringify(car));
            res.status(200).send(car);
        })
        .catch(err => {
            logger.error(err);
            res.status(400).send(err.message);
        });
});

// API 7: Update a Car By Id (Role Access: Only Admin)
app.put('/api/cars/:id', verifyToken, checkRole([ROLES.ADMIN]), (req, res) => {
    const carId = req.params.id;

    const { error, ...rest } = carUpdateSchema.validate(req.body);
    logger.error(error, rest);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    Car.findByIdAndUpdate(carId, req.body, { new: true })
        .then(car => {
            logger.info(car);
            if (!car) {
                return res.status(404).send('Car not found');
            }
            res.status(200).send(car);
        })
        .catch(err => {
            logger.error(err);
            res.status(400).send(err.message);
        });
});

// API 8: Delete a Car By Id (Role Access: Only Admin)
app.delete('/api/cars/:id', verifyToken, checkRole([ROLES.ADMIN]), (req, res) => {
    const carId = req.params.id;

    Car.findByIdAndDelete(carId)
        .then(car => {
            if (!car) {
                return res.status(404).send('Car not found');
            }
            res.status(200).send('Car deleted successfully');
        })
        .catch(err => {
            logger.error(err);
            res.status(500).send(err.message);
        });
});

// API 9: Login API (Role Access: NA)
app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists and the password is correct
    if (USER_LOGIN_DETAILS[username] && USER_LOGIN_DETAILS[username]['pwd'] === password) {
        const token = jwtSign({ username });

        // Return the token
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = app;