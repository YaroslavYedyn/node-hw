const Joi = require('joi');

module.exports = Joi.object({
    city: Joi.string()
        .trim()
        .min(2),
    street: Joi.string()
        .trim(),
    house: Joi.number()
        .min(0),

});
