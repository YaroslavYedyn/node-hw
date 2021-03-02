const { addressValidator } = require('../../validators');
const { errorCode } = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const { error } = await addressValidator.idAddressValidator.validate(req.params.id);

        if (error) {
            throw new Error(error.details[0].message);
        }
        next();
    } catch (e) {
        res.status(errorCode.BAD_REQUEST).json(e.message);
    }
};
