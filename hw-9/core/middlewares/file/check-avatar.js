const { ErrorHandler, errorMessage: { BODY_NOT_VALID }, errorCode } = require('../../Error');

module.exports = (req, res, next) => {
    try {
        if (req.photos.length > 1) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, BODY_NOT_VALID.customCode, 'Body not valid!');
        }

        [req.avatar] = req.photos;
        next();
    } catch (e) {
        next(e);
    }
};
