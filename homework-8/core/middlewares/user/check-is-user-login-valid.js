const { userValidator } = require('../../validators');
const { errorCode, errorMessage: { BODY_NOT_VALID }, ErrorHandler } = require('../../Error');

module.exports = async (req, res, next) => {
    try {
        const { error } = await userValidator.loginUserValidator.validate(req.body);

        if (error) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, BODY_NOT_VALID.customCode, error.details[0].message);
        }
        next();
    } catch (e) {
        next(e);
    }
};
