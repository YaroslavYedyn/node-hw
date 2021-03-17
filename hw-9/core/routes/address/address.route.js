const router = require('express').Router();

const { addressController } = require('../../controllers');
const { addressMiddleware, fileMiddleware } = require('../../middlewares');

router.get('/', addressController.findAddress);
router.post('/', addressMiddleware.checkIsAddressValid, fileMiddleware.checkFile, addressController.createAddress);
router.put('/', fileMiddleware.checkFile, addressController.updateAddress);
router.get('/:id', addressMiddleware.checkIsIdValid, addressController.getSingleAddress);
router.delete('/:id', addressMiddleware.checkIsIdValid, addressController.removeAddress);

module.exports = router;
