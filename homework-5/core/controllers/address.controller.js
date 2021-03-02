const { addressService } = require('../services');
const { errorCode, successMessage } = require('../constants');

module.exports = {
    findAddress: async (req, res) => {
        try {
            const address = await addressService.findAddress(req.query);
            res.json(address);
        } catch (e) {
            res.status(errorCode.UNAUTHORIZED).json(e.message);
        }
    },
    getSingleAddress: async (req, res) => {
        try {
            const address = await addressService.getSingleAddress(req.params.id);
            res.json(address);
        } catch (e) {
            res.status(errorCode.BAD_REQUEST).json(e.message);
        }
    },
    createAddress: async (req, res) => {
        try {
            const { preferL = 'en' } = req.body;
            await addressService.createAddress(req.body);
            res.json(successMessage.CREATE_ADDRESS[preferL]);
        } catch (e) {
            res.status(errorCode.UNAUTHORIZED).json(e.message);
        }
    },
    removeAddress: async (req, res) => {
        try {
            const { preferL = 'en' } = req.body;
            await addressService.removeAddress(req.params.id);
            res.json(successMessage.REMOVE_ADDRESS[preferL]);
        } catch (e) {
            res.status(errorCode.BAD_REQUEST).json(e.message);
        }
    }
};
