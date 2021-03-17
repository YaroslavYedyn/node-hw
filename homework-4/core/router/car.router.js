const router = require('express').Router();

const { carController } = require('../controller');
const { carMiddleware } = require('../middleware');

router.get('/', carController.findCars);
router.post('/', carMiddleware.checkBodyIsValid, carController.createCar);
router.patch('/', carMiddleware.checkUpdate, carController.updateCar);
router.put('/', carMiddleware.checkUpdate, carController.updateCars);
router.delete('/:carId', carMiddleware.checkIdIsValid, carController.removeCar);
router.get('/:carId', carMiddleware.checkIdIsValid, carController.getSingleCar);

module.exports = router;
