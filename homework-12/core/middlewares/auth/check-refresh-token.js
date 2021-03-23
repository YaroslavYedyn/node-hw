const jwt = require('jsonwebtoken');

const { authService, userService } = require('../../services');
const { errorMessage: { NO_TOKEN, WRONG_TOKEN }, errorCode, ErrorHandler } = require('../../Error');
const { JWT_REFRESH_SECRET } = require('../../config');
const { constants: { AUTHORIZATION } } = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const token = req.get(AUTHORIZATION);

        if (!token) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, NO_TOKEN.customCode);
        }

        console.log(token);
        const { dataValues } = await authService.getTokenByParams({ refresh_token: token }, 'user_id');
        console.log(dataValues);
        if (!dataValues) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, WRONG_TOKEN.customCode);
        }

        const data = await userService.getSingleUser({ id: dataValues.user_id });

        const user = data.dataValues;

        jwt.verify(token, JWT_REFRESH_SECRET[user.role], (error) => {
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
