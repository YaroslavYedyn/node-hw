const { ErrorHandler, errorMessage, errorCode } = require('../../Error');

module.exports = (whoHaveAccess = []) => (req, res, next) => {
    try {
        const { role } = req.user;

        if (!whoHaveAccess.length) {
            throw new ErrorHandler(errorCode.FORBIDDEN, errorMessage.USER_ROLE_NOT_FOUND.customCode, 'Access Denied!');
        }

        if (!whoHaveAccess.includes(role)) {
            throw new ErrorHandler(errorCode.FORBIDDEN, errorMessage.USER_ROLE_NOT_FOUND.customCode, 'Access Denied!');
        }

        next();
    } catch (e) {
        next(e);
    }
};
