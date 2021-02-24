const errorMessages = require('../constant/error.messages')
const errorCodes = require('../constant/errorCodes.enum')


module.exports = {
    checkIsValid: (req, res, next) => {
        console.log(Object.keys(req.query).length === 0);
        try {
            if (Object.keys(req.query).length === 0) {
                throw new Error(errorMessages.EMPTY["default"])
            }
            if (req.query.username === '' || req.query.email === '') {
                throw new Error(errorMessages.EMPTY["default"])
            }
            next()
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }

    }
}
