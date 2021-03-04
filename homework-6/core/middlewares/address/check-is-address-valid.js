const { addressValidator } = require('../../validators');
const { errorCode } = require('../../Error');

module.exports = async (req, res, next) => {
    try {
        const { error } = await addressValidator.createAddressValidator.validate(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }
        next();
    } catch (e) {
        res.status(errorCode.BAD_REQUEST).json(e.message);
    }
};
