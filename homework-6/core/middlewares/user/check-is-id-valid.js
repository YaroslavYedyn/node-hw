const { errorCode, errorMessage } = require('../../Error');
const { userValidator } = require('../../validators');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { preferL = 'en' } = req.body;
        const { error } = await userValidator.idUserValidator.validate(req.params.id);
        const user = await userService.getSingleUser({ _id: req.params.id });

        if (!user) {
            throw new Error(errorMessage.NOT_FOUND_USER[preferL]);
        }
        if (error) {
            throw new Error(error.details[0].message);
        }
        next();
    } catch (e) {
        res.status(errorCode.BAD_REQUEST).json(e.message);
    }
};
