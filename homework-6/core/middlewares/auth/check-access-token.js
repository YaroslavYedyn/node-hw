const jwt = require('jsonwebtoken');

const { authService } = require('../../services');
const { errorMessage, errorCode, ErrorHandler } = require('../../Error');
const { JWT_SECRET } = require('../../config');
const { constants: { AUTHORIZATION } } = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const access_token = req.get(AUTHORIZATION);

        if (!access_token) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, errorMessage.NO_TOKEN);
        }

        jwt.verify(access_token, JWT_SECRET, (error) => {
            if (error) {
                throw new ErrorHandler(errorCode.BAD_REQUEST, errorMessage.WRONG_TOKEN, error.details[0].message);
            }
        });

        const status = await authService.getTokenByParams({ access_token }, 'user_id');

        if (!status) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, errorMessage.WRONG_TOKEN);
        }

        next();
    } catch (e) {
        next(e);
    }
};
