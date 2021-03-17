const { Schema, model } = require('mongoose');

const addressScheme = new Schema({
    city: { type: String },
    street: { type: String },
    house: { type: Number },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

module.exports = model('Address', addressScheme);
