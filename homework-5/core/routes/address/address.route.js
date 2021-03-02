const router = require('express').Router();

const { addressController } = require('../../controllers');
const { addressMiddleware } = require('../../middlewares');

router.get('/', addressController.findAddress);
router.post('/', addressMiddleware.checkIsAddressValid, addressController.createAddress);
router.get('/:id', addressMiddleware.checkIsIdValid, addressController.getSingleAddress);
router.delete('/:id', addressMiddleware.checkIsIdValid, addressController.removeAddress);

module.exports = router;
