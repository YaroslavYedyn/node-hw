const { errorCode, errorMessage } = require('../constant');
const { findUserByID } = require('../service/user.service');

module.exports = {
    checkIdIsValid: async (req, res, next) => {
        try {
            const id = await req.params.userId;
            const user = await findUserByID(id);
            const { preferL = 'en' } = req.body;
            if (id.length !== 24) {
                throw new Error(errorMessage.NOT_VALID_ID.default);
            }
            if (!user) {
                throw new Error(errorMessage.NOT_FOUND_USER[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCode.BAD_REQUEST).json(e.message);
        }
    },

    checkUserIsValid: async (req, res, next) => {
        try {
            const {
                name, age, preferL
            } = await req.body;
            if (!name || typeof name !== 'string') {
                throw new Error(errorMessage.NOT_VALID_NAME[preferL || 'default']);
            }
            if (age < 0 || !Number.isInteger(age) || Number.isNaN(age)) {
                throw new Error(errorMessage.NOT_VALID_AGE[preferL || 'default']);
            }
            next();
        } catch (e) {
            res.status(errorCode.BAD_REQUEST).json(e.message);
        }
    },

    checkUpdateUserIsValid: async (req, res, next) => {
        try {
            const {
                name, lastname, preferL
            } = await req.body;
            if (name && typeof name !== 'string') {
                throw new Error(errorMessage.NOT_VALID_NAME[preferL || 'default']);
            }
            if (lastname && typeof lastname !== 'string') {
                throw new Error(errorMessage.NOT_VALID_LASTNAME[preferL || 'default']);
            }
            next();
        } catch (e) {
            res.status(errorCode.BAD_REQUEST).json(e.message);
        }
    }
};
