const jwt = require('jsonwebtoken');

const { userService } = require('../../services');
const { errorMessage: { WRONG_TOKEN, NO_TOKEN }, errorCode, ErrorHandler } = require('../../Error');
const { JWT_ACTIVATE_SECRET } = require('../../config');

module.exports = async (req, res, next) => {
    try {
        const { token } = req.query;

        if (!token) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, NO_TOKEN.customCode, 'Wrong token!');
        }
        const { dataValues } = await userService.getSingleUser({ activate_token: token });

        jwt.verify(token, JWT_ACTIVATE_SECRET[dataValues.role], (error) => {
            if (error) {
                throw new ErrorHandler(errorCode.BAD_REQUEST, WRONG_TOKEN.customCode, error.details[0].message);
            }
        });

        if (!dataValues) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, WRONG_TOKEN.customCode, 'Wrong token!');
        }

        req.user = dataValues;
        next();
    } catch (e) {
        next(e);
    }
};
