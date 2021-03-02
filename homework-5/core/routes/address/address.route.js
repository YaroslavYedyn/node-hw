const router = require('express').Router();

const { addressController } = require('../../controllers');
const { addressMiddleware } = require('../../middlewares');

router.get('/', addressController.findAddress);
router.post('/', addressMiddleware.checkIsAddressValid, addressController.createAddress);

module.exports = router;
