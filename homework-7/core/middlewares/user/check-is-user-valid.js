const { errorCode, errorMessage: { BODY_NOT_VALID }, ErrorHandler } = require('../../Error');
const { userValidator } = require('../../validators');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { email } = req.body;
        const { error } = await userValidator.createUserValidator.validate(req.body);

        if (error) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, BODY_NOT_VALID.customCode, error.details[0].message);
        }
        const unique = await userService.getSingleUser({ email });
        if (unique) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, BODY_NOT_VALID.customCode, 'Not valid body');
        }
        next();
    } catch (e) {
        next(e);
    }
};
