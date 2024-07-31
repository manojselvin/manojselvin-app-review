const Joi = require('@hapi/joi');

const carUpdateSchema = Joi.object({
    make: Joi.string().trim(),
    model: Joi.string().trim(),
    year: Joi.number(),
    price: Joi.number()
}).xor('make', 'model', 'year', 'price');

module.exports = carUpdateSchema;