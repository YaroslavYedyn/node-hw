const { addressService, fileService } = require('../services');
const { successMessage } = require('../Error');
const { constants: { PHOTOS_FOLDER_NAME, DOCUMENT_FOLDER_NAME } } = require('../constants');

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
            const address = await addressService.getSingleAddress({ _id: req.params.id });

            res.json(address);
        } catch (e) {
            next(e);
        }
    },
    createAddress: async (req, res, next) => {
        try {
            const { body, photos } = req;
            const address = await addressService.createAddress(body);
            const photoArr = [];
            if (photos) {
                for (let i = 0; i < photos.length; i++) {
                    // eslint-disable-next-line no-await-in-loop
                    const uploadPath = await fileService.downloadFile(photos[i], PHOTOS_FOLDER_NAME, address, 'address');
                    photoArr.push(uploadPath);
                }
                await addressService.updateAddress({ _id: address._id }, { $set: { photos: photoArr } });
            }
            res.json(successMessage.CREATE);
        } catch (e) {
            next(e);
        }
    },
    updateAddress: async (req, res, next) => {
        try {
            const { docs } = req;
            const address = await addressService.getSingleAddress(req.query);
            const docsArr = [];
            if (docs) {
                for (let i = 0; i < docs.length; i++) {
                    // eslint-disable-next-line no-await-in-loop
                    const uploadPath = await fileService.downloadFile(docs[i], DOCUMENT_FOLDER_NAME, address._id, 'address');
                    docsArr.push(uploadPath);
                }
                await addressService.updateAddress({ _id: address._id }, { $set: { docs: docsArr } });
            }
            res.json(successMessage.UPDATE);
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
