const jwt = require('jsonwebtoken');

const { authService, userService } = require('../../services');
const { errorMessage: { WRONG_TOKEN, NO_TOKEN }, errorCode, ErrorHandler } = require('../../Error');
const { JWT_SECRET } = require('../../config');
const { constants: { AUTHORIZATION } } = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const access_token = req.get(AUTHORIZATION);

        if (!access_token) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, NO_TOKEN.customCode, 'Wrong token!');
        }

        const { dataValues } = await authService.getTokenByParams({
            access_token
        });

        if (!dataValues) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, WRONG_TOKEN.customCode, 'Wrong token!');
        }

        const user = await userService.getSingleUser({ id: dataValues.user_id })
            .then((value) => value.dataValues);

        jwt.verify(access_token, JWT_SECRET.user, (error) => {
            if (error) {
                throw new ErrorHandler(errorCode.BAD_REQUEST, WRONG_TOKEN.customCode, error.details[0].message);
            }
        });
        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
};
