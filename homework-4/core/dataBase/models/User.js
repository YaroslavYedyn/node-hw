const { Schema, model } = require('mongoose');

const carScheme = {
    model: { type: String },
    price: { type: Number }
};

const userScheme = new Schema({
    name: { type: String, required: true },
    lastname: { type: String },
    age: { type: Number },
    cars: [carScheme]
});

module.exports = model('User', userScheme);
