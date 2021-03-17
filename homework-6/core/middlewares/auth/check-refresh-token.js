const jwt = require('jsonwebtoken');

const { authService } = require('../../services');
const { errorMessage, errorCode, ErrorHandler } = require('../../Error');
const { JWT_REFRESH_SECRET } = require('../../config');
const { constants: { AUTHORIZATION } } = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const token = req.get(AUTHORIZATION);

        if (!token) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, errorMessage.NO_TOKEN);
        }

        jwt.verify(token, JWT_REFRESH_SECRET, (error) => {
            if (error) {
                throw new ErrorHandler(errorCode.BAD_REQUEST, errorMessage.WRONG_TOKEN, error.details[0].message);
            }
        });

        const status = await authService.getTokenByParams({ refresh_token: token }, 'user_id');

        if (!status) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, errorMessage.WRONG_TOKEN);
        }
        req.user_id = status.user_id.id;

        next();
    } catch (e) {
        next(e);
    }
};
