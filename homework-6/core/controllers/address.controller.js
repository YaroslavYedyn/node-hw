const { addressService } = require('../services');
const { successMessage } = require('../Error');

module.exports = {
    findAddress: async (req, res, next) => {
        try {
            const address = await addressService.findAddress(req.query);

            res.json(address);
        } catch (e) {
            next(e);
        }
    },
    getSingleAddress: async (req, res, next) => {
        try {
            const address = await addressService.getSingleAddress(req.params.id);

            res.json(address);
        } catch (e) {
            next(e);
        }
    },
    createAddress: async (req, res, next) => {
        try {
            await addressService.createAddress(req.body);

            res.json(successMessage.CREATE);
        } catch (e) {
            next(e);
        }
    },
    removeAddress: async (req, res, next) => {
        try {
            await addressService.removeAddress(req.params.id);

            res.json(successMessage.REMOVE);
        } catch (e) {
            next(e);
        }
    }
};
