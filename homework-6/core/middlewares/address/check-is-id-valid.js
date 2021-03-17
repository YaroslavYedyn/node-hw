const { addressValidator } = require('../../validators');
const { addressService } = require('../../services');
const { errorCode, errorMessage, ErrorHandler } = require('../../Error');

module.exports = async (req, res, next) => {
    try {
        const { error } = await addressValidator.idAddressValidator.validate(req.params.id);
        const address = await addressService.getSingleAddress(req.params.id);
        if (!address) {
            throw new ErrorHandler(errorCode.NOT_FOUND, errorMessage.ADDRESS_NOT_FOUND);
        }
        if (error) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, errorMessage.ID_NOT_VALID, error.details[0].message);
        }
        next();
    } catch (e) {
        next(e);
    }
};
