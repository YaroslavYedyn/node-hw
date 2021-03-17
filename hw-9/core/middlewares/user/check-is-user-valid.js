const { errorCode, errorMessage: { BODY_NOT_VALID }, ErrorHandler } = require('../../Error');
const { userValidator } = require('../../validators');
const { userService } = require('../../services');
const { activateAccountToken } = require('../../helpers');

module.exports = async (req, res, next) => {
    try {
        const { email } = req.body;
        const token = activateAccountToken();
        const newUser = { ...req.body, activate_token: token, activate_status: false };

        const { error } = await userValidator.createUserValidator.validate(newUser);

        if (error) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, BODY_NOT_VALID.customCode, error.details[0].message);
        }

        const unique = await userService.getSingleUser({ email });
        if (unique) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, BODY_NOT_VALID.customCode, 'Not valid body');
        }
        req.user = newUser;
        next();
    } catch (e) {
        next(e);
    }
};
