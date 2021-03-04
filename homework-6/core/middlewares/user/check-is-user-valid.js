const { errorCode, errorMessage } = require('../../Error');
const { userValidator } = require('../../validators');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { email, prefL = 'en' } = req.body;
        const { error } = await userValidator.createUserValidator.validate(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }
        const unique = await userService.getSingleUser({ email });
        if (unique) {
            throw new Error(errorMessage.NOT_EXISTS[prefL]);
        }
        next();
    } catch (e) {
        res.status(errorCode.BAD_REQUEST).json(e.message);
    }
};
