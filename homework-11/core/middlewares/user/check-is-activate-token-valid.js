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
        jwt.verify(token, JWT_ACTIVATE_SECRET, (error) => {
            if (error) {
                throw new ErrorHandler(errorCode.BAD_REQUEST, WRONG_TOKEN.customCode, error.details[0].message);
            }
        });

        const status = await userService.getSingleUser({ activate_token: token });

        if (!status) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, WRONG_TOKEN.customCode, 'Wrong token!');
        }

        req.user = status;
        next();
    } catch (e) {
        next(e);
    }
};
