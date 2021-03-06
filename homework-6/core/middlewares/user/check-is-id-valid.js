const { errorCode, errorMessage, ErrorHandler } = require('../../Error');
const { userValidator } = require('../../validators');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { error } = await userValidator.idUserValidator.validate(req.params.id);
        const user = await userService.getSingleUser({ _id: req.params.id });

        if (!user) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, errorMessage.USER_NOT_FOUND);
        }
        if (error) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, errorMessage.ID_NOT_VALID, error.details[0].message);
        }
        next();
    } catch (e) {
        next(e);
    }
};
