const request = require('supertest');
const app = require('./server');
const logger = require('./config/logger');

let AdminToken = null;
let carId = null;

let generateAuthTokens = async () => {
    let resAdmin = await request(app).post('/auth/login').send({
        "username": "admintest",
        "password": "adminpwd"
    });

    let resUser = await request(app).post('/auth/login').send({
        "username": "usertest",
        "password": "userpwd"
    });

    AdminToken = resAdmin.body.token;
    userToken = resUser.body.token;
}

beforeAll(async () => {
    await generateAuthTokens();
});

describe('API tests', () => {
    // Test API 1: Get all cars
    describe('GET /api/cars', () => {
        it('should return all cars', async () => {
            const response = await request(app).get('/api/cars');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });
    });

    // Test API 2: Create a new user
    describe('POST /api/cars', () => {
        it('should create a new car', async () => {
            const newCar = {
                "make": "Toyota",
                "model": "Camry",
                "year": 2021,
                "price": 1999999
            };
            const response = await request(app).post('/api/cars').set('Authorization', AdminToken).send(newCar);
            expect(response.status).toBe(201);
            expect(response.body.make).toBe(newCar.make);
            expect(response.body.model).toBe(newCar.model);
            carId = response?.body?._id;
        });

        it('should return 400 if request body is invalid', async () => {
            const invalidCar = { make: 'Maruti' };
            const response = await request(app).post('/api/cars').set('Authorization', AdminToken).send(invalidCar);
            expect(response.status).toBe(400);
        });
    });

    // Test API 3: Get a car by ID
    describe('GET /api/cars/:id', () => {
        it('should return a car by ID', async () => {
            const response = await request(app).get(`/api/cars/${carId}`);
            logger.info(response);
            expect(response.status).toBe(200);
            expect(response.body._id).toBe(carId);
        });

        it('should return 404 if car not found', async () => {
            const response = await request(app).get('/api/cars/6696645e5e5000fe18f745fe');
            expect(response.status).toBe(404);
        });
    });



    // Test API 4: Update a car by ID
    describe('PUT /api/cars/:id', () => {
        it('should update a car by ID', async () => {
            const updatedCar = { year: 2021 };
            const response = await request(app).put(`/api/cars/${carId}`).set('Authorization', AdminToken).send(updatedCar);
            expect(response.status).toBe(200);
            expect(response.body.year).toBe(updatedCar.year);
        });

        it('should return 404 if car not found', async () => {
            const updatedCar = { model: 'Civic' };
            const response = await request(app).put(`/api/cars/6696645e5e5000fe18f745fa`).set('Authorization', AdminToken).send(updatedCar);
            expect(response.status).toBe(404);
        });

        it('should return 400 if request body is invalid', async () => {
            const invalidCar = { dummy: 'junk car' };
            const response = await request(app).put(`/api/cars/${carId}`).set('Authorization', AdminToken).send(invalidCar);
            expect(response.status).toBe(400);
        });
    });

    // Test API 5: Get all cars
    describe('GET /api/cars', () => {
        it('should return all cars', async () => {
            const response = await request(app).get('/api/cars');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });
    });
});