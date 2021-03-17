const { addressValidator } = require('../../validators');
const { addressService } = require('../../services');
const { errorCode, errorMessage: { ADDRESS_NOT_FOUND, ID_NOT_VALID }, ErrorHandler } = require('../../Error');

module.exports = async (req, res, next) => {
    try {
        const { error } = await addressValidator.idAddressValidator.validate(req.params.id);
        const address = await addressService.getSingleAddress(req.params.id);
        if (!address) {
            throw new ErrorHandler(errorCode.NOT_FOUND, ADDRESS_NOT_FOUND.customCode);
        }
        if (error) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, ID_NOT_VALID.customCode, error.details[0].message);
        }
        next();
    } catch (e) {
        next(e);
    }
};
