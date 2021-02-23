const errorMessages = require('../constant/error.messages')
const errorCodes = require('../constant/errorCodes.enum')


module.exports = {
    checkIsValid: (req, res, next) => {
        try {
            if (!req.query) {
                throw new Error(errorMessages.NOT_VALID["default"])
            }
            if (req.query.name === '') {
                throw new Error(errorMessages.EMPTY["default"])
            }
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }

    }
}
