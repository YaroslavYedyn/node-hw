const { userValidator } = require('../../validators');
const { errorCode, errorMessage, ErrorHandler } = require('../../Error');

module.exports = async (req, res, next) => {
    try {
        const { error } = await userValidator.loginUserValidator.validate(req.body);

        if (error) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, errorMessage.BODY_NOT_VALID, error.details[0].message);
        }
        next();
    } catch (e) {
        next(e);
    }
};
