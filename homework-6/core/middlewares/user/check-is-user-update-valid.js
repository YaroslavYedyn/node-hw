const { errorCode } = require('../../constants');
const { userValidator } = require('../../validators');

module.exports = async (req, res, next) => {
    try {
        const { error } = await userValidator.updateUserValidator.validate(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }
        next();
    } catch (e) {
        res.status(errorCode.BAD_REQUEST).json(e.message);
    }
};
