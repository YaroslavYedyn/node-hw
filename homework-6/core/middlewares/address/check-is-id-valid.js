const { addressValidator } = require('../../validators');
const { addressService } = require('../../services');
const { errorCode, errorMessage } = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const { preferL = 'en' } = req.body;
        const { error } = await addressValidator.idAddressValidator.validate(req.params.id);
        const address = await addressService.getSingleAddress(req.params.id);
        if (!address) {
            throw new Error(errorMessage.NOT_FOUND_ADDRESS[preferL]);
        }
        if (error) {
            throw new Error(error.details[0].message);
        }
        next();
    } catch (e) {
        res.status(errorCode.BAD_REQUEST).json(e.message);
    }
};
