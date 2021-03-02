const { addressService } = require('../services');

module.exports = {
    findAddress: async (req, res) => {
        try {
            const address = await addressService.findAddress(req.query);
            res.json(address);
        } catch (e) {
            res.status(418).json(e.message);
        }
    },
    createAddress: async (req, res) => {
        try {
            await addressService.createAddress(req.body);
            res.json('Address created');
        } catch (e) {
            res.status(401).json(e.message);
        }
    }
};
