const jwt = require('jsonwebtoken');

const { authService } = require('../../services');
const { errorMessage: { WRONG_TOKEN, NO_TOKEN }, errorCode, ErrorHandler } = require('../../Error');
const { JWT_SECRET } = require('../../config');

module.exports = async (req, res, next) => {
    try {
        const { token } = req.query;

        if (!token) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, NO_TOKEN.customCode, 'Wrong token!');
        }

        jwt.verify(token, JWT_SECRET, (error) => {
            if (error) {
                throw new ErrorHandler(errorCode.BAD_REQUEST, WRONG_TOKEN.customCode, error.details[0].message);
            }
        });

        const status = await authService.getTokenByParams({ access_token: token }, 'user_id');

        if (!status) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, WRONG_TOKEN.customCode, 'Wrong token!');
        }

        req.user_id = status.user_id._id;
        next();
    } catch (e) {
        next(e);
    }
};
