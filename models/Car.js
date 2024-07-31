const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    price: Number
});

const Car = mongoose.model('cars', carSchema);

module.exports = Car;