const { errorCode, errorMessage: { USER_NOT_FOUND, ID_NOT_VALID }, ErrorHandler } = require('../../Error');
const { userValidator } = require('../../validators');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { error } = await userValidator.idUserValidator.validate(req.params.id);
        const user = await userService.getSingleUser({ _id: req.params.id });

        if (!user) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, USER_NOT_FOUND.customCode, 'User not found');
        }
        if (error) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, ID_NOT_VALID.customCode, error.details[0].message);
        }
        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
};
