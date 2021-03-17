const { Schema, model } = require('mongoose');

const carScheme = new Schema({
    model: { type: String },
    brand: { type: String },
    price: { type: Number }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

carScheme.virtual('title').get(function() {
    return `${this.brand} ${this.model} | ${this.price}$`;
});

module.exports = model('Car', carScheme);
