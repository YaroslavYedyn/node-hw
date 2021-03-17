const Joi = require('joi');

const { regexp } = require('../../constants');

module.exports = Joi.object({
    name: Joi.string()
        .alphanum()
        .trim()
        .min(2)
        .max(50),
    age: Joi.number()
        .integer()
        .min(0)
        .max(120),
    email: Joi.string()
        .regex(regexp.EMAIL_REGEXP)
        .required(),
    password: Joi.string()
        .regex(regexp.PASSWORD_REGEXP)
        .trim()
        .required(),
    activate_token: Joi.string(),
    activate_status: Joi.boolean()
        .required()
});
