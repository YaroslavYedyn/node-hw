const errorMessages = require('../constant/error.messages')


module.exports = {
    checkIsValid: (req, res, next) => {
        if (!req.query) {
            throw new Error(errorMessages.NOT_VALID["default"])
        }
    }
}
