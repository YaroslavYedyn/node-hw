const { errorCode, errorMessage, ErrorHandler } = require('../../Error');
const { userValidator } = require('../../validators');

module.exports = async (req, res, next) => {
    try {
        const { error } = await userValidator.updateUserValidator.validate(req.body);

        if (error) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, errorMessage.BODY_NOT_VALID, error.details[0].message);
        }
        next();
    } catch (e) {
        next(e);
    }
};
