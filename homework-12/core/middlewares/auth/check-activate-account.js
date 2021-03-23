const { ErrorHandler, errorCode, errorMessage: { USER_NOT_ACTIVATE } } = require('../../Error');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { email } = req.body;
        const { dataValues } = await userService.getSingleUser({ email });

        if (!dataValues.activate_status) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, USER_NOT_ACTIVATE.customCode, 'User not activate!');
        }

        req.user = dataValues;
        next();
    } catch (e) {
        next(e);
    }
};
