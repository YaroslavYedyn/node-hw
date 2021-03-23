const Joi = require('joi');

const { regexp } = require('../../constants');

module.exports = Joi.object({
    old_password: Joi.string()
        .trim()
        .required()
        .regex(regexp.PASSWORD_REGEXP),
    new_password: Joi.string()
        .trim()
        .required()
        .regex(regexp.PASSWORD_REGEXP),
    email: Joi.string()
        .trim()
        .required()
        .regex(regexp.EMAIL_REGEXP)
});
