const { errorCode, errorMessage, ErrorHandler } = require('../../Error');
const { userValidator } = require('../../validators');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { email } = req.body;
        const { error } = await userValidator.createUserValidator.validate(req.body);

        if (error) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, errorMessage.BODY_NOT_VALID, error.details[0].message);
        }
        const unique = await userService.getSingleUser({ email });
        if (unique) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, errorMessage.BODY_NOT_VALID);
        }
        next();
    } catch (e) {
        next(e);
    }
};
