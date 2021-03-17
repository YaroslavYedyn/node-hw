const { Schema, model } = require('mongoose');

const userScheme = new Schema({
    name: { type: String, required: true },
    lastname: { type: String },
    age: { type: Number },
    cars: [{ type: Schema.Types.Mixed }]
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userScheme.virtual('full_name').get(function() {
    return `${this.name} ${this.lastname}`;
});

userScheme.virtual('userCars', {
    ref: 'Car',
    localField: 'cars',
    foreignField: '_id',
});

userScheme
    .pre('find', () => {
        console.log('PRE FIND HOOK');
        this.populate('userCars');
    })
    .pre('findOne', () => {
        console.log('PRE FIND ONE HOOK');

        this.populate('userCars');
    });

module.exports = model('User', userScheme);
