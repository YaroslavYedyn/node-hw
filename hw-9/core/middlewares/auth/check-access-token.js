const jwt = require('jsonwebtoken');

const { authService } = require('../../services');
const { errorMessage: { WRONG_TOKEN, NO_TOKEN }, errorCode, ErrorHandler } = require('../../Error');
const { JWT_SECRET } = require('../../config');
const { constants: { AUTHORIZATION } } = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const access_token = req.get(AUTHORIZATION);

        if (!access_token) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, NO_TOKEN.customCode, 'Wrong token!');
        }

        jwt.verify(access_token, JWT_SECRET, (error) => {
            if (error) {
                throw new ErrorHandler(errorCode.BAD_REQUEST, WRONG_TOKEN.customCode, error.details[0].message);
            }
        });

        const status = await authService.getTokenByParams({ access_token }, 'user_id');

        if (!status) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, WRONG_TOKEN.customCode, 'Wrong token!');
        }

        next();
    } catch (e) {
        next(e);
    }
};
