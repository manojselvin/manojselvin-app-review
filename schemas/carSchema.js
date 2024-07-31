const Joi = require('@hapi/joi');

const carSchema = Joi.object({
    make: Joi.string().required().trim(),
    model: Joi.string().required().trim(),
    year: Joi.number().required(),
    price: Joi.number().required()
});

module.exports = carSchema;