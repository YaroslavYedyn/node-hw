const { errorCode, errorMessage } = require('../constant');

module.exports = {
    checkIdIsValid: async (req, res, next) => {
        try {
            const id = await req.params.carId;
            if (id.length !== 24) {
                throw new Error(errorMessage.NOT_VALID_ID.default);
            }
            next();
        } catch (e) {
            res.status(errorCode.BAD_REQUEST).json(e.message);
        }
    },
    checkBodyIsValid: async (req, res, next) => {
        try {
            const {
                brand, model, price, preferL
            } = await req.body;
            if (!brand || typeof brand !== 'string') {
                throw new Error(errorMessage.NOT_VALID_BRAND[preferL || 'default']);
            }
            if (!model) {
                throw new Error(errorMessage.EMPTY[preferL || 'default']);
            }
            if (price < 0 || !Number.isInteger(price) || Number.isNaN(price)) {
                throw new Error(errorMessage.NOT_VALID_PRICE[preferL || 'default']);
            }
            next();
        } catch (e) {
            res.status(errorCode.BAD_REQUEST).json(e.message);
        }
    },

    checkUpdate: async (req, res, next) => {
        try {
            const {
                brand, price, preferL
            } = await req.body;
            if (brand && typeof brand !== 'string') {
                throw new Error(errorMessage.NOT_VALID_BRAND[preferL || 'default']);
            }
            if (price < 0 || !Number.isInteger(price) || Number.isNaN(price)) {
                throw new Error(errorMessage.NOT_VALID_PRICE[preferL || 'default']);
            }
            next();
        } catch (e) {
            res.status(errorCode.BAD_REQUEST).json(e.message);
        }
    }
};
