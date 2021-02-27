const router = require('express').Router();

const userRouter = require('./user.router');
const carRouter = require('./car.router');

router.use('/users', userRouter);
router.use('/cars', carRouter);

module.exports = router;
