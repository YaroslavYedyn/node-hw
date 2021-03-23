const { addressService, fileService } = require('../services');
const { successMessage } = require('../Error');
const { constants: { PHOTOS_FOLDER_NAME, DOCUMENT_FOLDER_NAME } } = require('../constants');
const { sequelize } = require('../dataBase');
const logger = require('../logger')();

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
            const address = await addressService.getSingleAddress({ id: req.params.id });

            res.json(address);
        } catch (e) {
            next(e);
        }
    },
    createAddress: async (req, res, next) => {
        const transaction = await sequelize.transaction();
        try {
            const { body, photos } = req;
            const address = await addressService.createAddress(body, transaction);
            const photoArr = [];
            if (photos) {
                for (let i = 0; i < photos.length; i++) {
                    // eslint-disable-next-line no-await-in-loop,
                    const uploadPath = await fileService.downloadFile(
                        photos[i],
                        PHOTOS_FOLDER_NAME,
                        address,
                        'address',
                        transaction
                    );
                    photoArr.push(uploadPath);
                }
                await addressService.updateAddress({ id: address.id }, { photos: photoArr }, transaction);
            }

            await transaction.commit();

            logger.info(successMessage.CREATE.customCode);
            res.json(successMessage.CREATE);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },
    updateAddress: async (req, res, next) => {
        const transaction = await sequelize.transaction();
        try {
            const { docs } = req;
            const address = await addressService.getSingleAddress(req.query);
            const docsArr = [];

            if (docs) {
                for (let i = 0; i < docs.length; i++) {
                    // eslint-disable-next-line no-await-in-loop
                    const uploadPath = await fileService.downloadFile(docs[i],
                        DOCUMENT_FOLDER_NAME,
                        address._id,
                        'address', transaction);
                    docsArr.push(uploadPath);
                }
                await addressService.updateAddress({ id: address.id }, { $set: { docs: docsArr } }, transaction);
            }
            await transaction.commit();

            logger.info(successMessage.UPDATE.customCode);
            res.json(successMessage.UPDATE);
        } catch (e) {
            transaction.rollback();
            next(e);
        }
    },
    removeAddress: async (req, res, next) => {
        const transaction = await sequelize.transaction();
        try {
            await addressService.removeAddress(req.params.id, transaction);

            await transaction.commit();

            logger.info(successMessage.REMOVE.customCode);
            res.json(successMessage.REMOVE);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }
};
