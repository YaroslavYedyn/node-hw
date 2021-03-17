const { ErrorHandler, errorMessage, errorCode } = require('../../Error');
const { userValidator } = require('../../validators');
const { userService } = require('../../services');
const { passwordHelper } = require('../../helpers');

module.exports = async (req, res, next) => {
    try {
        const { email, old_password } = req.body;
        const { error } = userValidator.forgotPasswordValidator.validate(req.body);

        if (error) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, errorMessage.BODY_NOT_VALID.customCode, 'body not valid');
        }

        const user = await userService.getSingleUser({ email });

        if (!user) {
            throw new ErrorHandler(errorCode.NOT_FOUND, errorMessage.USER_NOT_FOUND.customCode, 'User not found');
        }

        await passwordHelper.compare(old_password, user.password);

        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
};
