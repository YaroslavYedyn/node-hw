const { Schema, model } = require('mongoose');

const userScheme = new Schema({
    name: { type: String },
    age: { type: Number },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: Schema.Types.Mixed },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

userScheme.virtual('userAddress', {
    ref: 'Address',
    localField: 'address',
    foreignField: '_id',
});

userScheme
    .pre('find', function() {
        console.log('PRE FIND HOOK');
        this.populate('userAddress');
    })
    .pre('findOne', function() {
        console.log('PRE FIND ONE HOOK');

        this.populate('userAddress');
    });

module.exports = model('User', userScheme);
